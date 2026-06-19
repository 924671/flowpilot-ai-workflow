export function formatActivityLabel(timestamp = Date.now()) {
  return new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(timestamp));
}

function cloneContextValues(contextValues = {}) {
  return { ...contextValues };
}

function cloneGeneratedVersions(generatedVersions = []) {
  return Array.isArray(generatedVersions)
    ? generatedVersions.map((item) => ({ ...item }))
    : [];
}

function cloneHistory(history = []) {
  return Array.isArray(history) ? history.map((item) => ({ ...item })) : [];
}

function buildHistoryEntry(action, template, timestamp = Date.now()) {
  return {
    id: `${template.id}-history-${timestamp}`,
    action,
    savedAt: timestamp,
    savedAtLabel: formatActivityLabel(timestamp),
    title: template.title,
    description: template.description,
    tags: [...(template.tags ?? [])],
    contextValues: cloneContextValues(template.contextValues),
    generatedVersions: cloneGeneratedVersions(template.generatedVersions),
  };
}

function buildTemplateBase(base, previousTemplate) {
  const timestamp = Date.now();
  const nextTitle = base.title || `${base.taskName} 模板入口`;
  const nextDescription =
    base.description || '保留当前上下文和生成版本，作为可复用的模板入口。';
  const tags = Array.from(
    new Set([
      ...(previousTemplate?.tags ?? []),
      ...(base.tags ?? []),
      base.taskName,
    ].filter(Boolean)),
  );

  const history =
    previousTemplate?.versionHistory && previousTemplate.versionHistory.length > 0
      ? cloneHistory(previousTemplate.versionHistory)
      : [
          buildHistoryEntry(
            '创建模板',
            {
              ...base,
              title: nextTitle,
              description: nextDescription,
              tags,
            },
            timestamp,
          ),
        ];

  return {
    ...base,
    title: nextTitle,
    description: nextDescription,
    tags,
    createdAt: previousTemplate?.createdAt ?? base.createdAt ?? timestamp,
    createdAtLabel:
      previousTemplate?.createdAtLabel ??
      base.createdAtLabel ??
      formatActivityLabel(timestamp),
    updatedAt: timestamp,
    updatedAtLabel: formatActivityLabel(timestamp),
    isPinned: previousTemplate?.isPinned ?? base.isPinned ?? false,
    usageCount: previousTemplate?.usageCount ?? base.usageCount ?? 0,
    lastUsedAt: previousTemplate?.lastUsedAt ?? base.lastUsedAt ?? null,
    lastUsedAtLabel: previousTemplate?.lastUsedAtLabel ?? base.lastUsedAtLabel ?? '',
    versionHistory: history,
  };
}

export function appendTemplateHistory(template, action) {
  return {
    ...template,
    updatedAt: Date.now(),
    updatedAtLabel: formatActivityLabel(),
    versionHistory: [
      buildHistoryEntry(action, template),
      ...(template.versionHistory ?? []),
    ].slice(0, 12),
  };
}

export function buildTemplateFromSkillRecord(record, previousTemplate) {
  return buildTemplateBase(
    {
      id: previousTemplate?.id ?? `${record.id}-template`,
      taskId: record.taskId,
      taskName: record.taskName,
      description: record.suggestion,
      contextValues: cloneContextValues(record.contextValues),
      generatedVersions: cloneGeneratedVersions(record.generatedVersions),
      sourceType: 'skill-record',
      sourceLabel: '来自 Skill Records',
      linkedSkillRecordId: record.id,
      linkedResultId: record.linkedResultId ?? '',
      linkedWorkflowId: record.linkedWorkflowId ?? '',
      createdAtLabel: record.savedAtLabel,
      tags: ['Skill', '方法沉淀'],
    },
    previousTemplate,
  );
}

export function buildTemplateFromResult(result, previousTemplate) {
  return buildTemplateBase(
    {
      id: previousTemplate?.id ?? `${result.id}-template`,
      taskId: result.taskId,
      taskName: result.taskName,
      description: '基于已保存结果回填上下文，并继续生成新的适配版本。',
      contextValues: cloneContextValues(result.contextValues),
      generatedVersions: cloneGeneratedVersions(result.generatedVersions),
      sourceType: 'result-library',
      sourceLabel: '来自 Results Library',
      linkedSkillRecordId: result.linkedSkillRecordId ?? '',
      linkedResultId: result.id,
      linkedWorkflowId: result.linkedWorkflowId ?? '',
      createdAtLabel: result.savedAtLabel,
      tags: ['Result', '复用入口'],
    },
    previousTemplate,
  );
}

export function buildTemplateFromSession(task, session, previousTemplate) {
  const templateId =
    previousTemplate?.id ??
    session.linkedTemplateId ??
    `${task.id}-template-${Date.now()}`;

  return buildTemplateBase(
    {
      id: templateId,
      taskId: task.id,
      taskName: task.name,
      description:
        '保留当前上下文、已生成版本和流程结构，作为可继续回填的模板入口。',
      contextValues: cloneContextValues(session.contextValues),
      generatedVersions: cloneGeneratedVersions(session.generatedVersions),
      sourceType: 'workflow-session',
      sourceLabel: '来自当前 Workflow',
      linkedSkillRecordId: session.linkedSkillRecordId ?? '',
      linkedResultId: session.linkedResultId ?? '',
      linkedWorkflowId: session.linkedWorkflowId ?? '',
      createdAtLabel: session.savedAtLabel || formatActivityLabel(),
      tags: ['Workflow', '继续编辑'],
    },
    previousTemplate,
  );
}

export function buildTemplateExportPayload(template) {
  return {
    id: template.id,
    taskId: template.taskId,
    taskName: template.taskName,
    title: template.title,
    description: template.description,
    sourceType: template.sourceType,
    sourceLabel: template.sourceLabel,
    createdAtLabel: template.createdAtLabel,
    updatedAtLabel: template.updatedAtLabel,
    usageCount: template.usageCount ?? 0,
    isPinned: Boolean(template.isPinned),
    tags: [...(template.tags ?? [])],
    contextValues: cloneContextValues(template.contextValues),
    generatedVersions: cloneGeneratedVersions(template.generatedVersions),
    versionHistory: cloneHistory(template.versionHistory),
  };
}

export function importTemplatePayload(payload) {
  const timestamp = Date.now();
  const title = payload?.title?.trim() || `${payload?.taskName || '未命名任务'} 模板入口`;

  return {
    id: payload?.id || `imported-template-${timestamp}`,
    taskId: payload?.taskId || '',
    taskName: payload?.taskName || '未命名任务',
    title,
    description:
      payload?.description || '从外部 JSON 导入的模板入口，可直接继续回填使用。',
    sourceType: payload?.sourceType || 'imported-template',
    sourceLabel: payload?.sourceLabel || '来自导入文件',
    contextValues: cloneContextValues(payload?.contextValues),
    generatedVersions: cloneGeneratedVersions(payload?.generatedVersions),
    linkedSkillRecordId: payload?.linkedSkillRecordId || '',
    linkedResultId: payload?.linkedResultId || '',
    linkedWorkflowId: payload?.linkedWorkflowId || '',
    createdAt: timestamp,
    createdAtLabel: payload?.createdAtLabel || formatActivityLabel(timestamp),
    updatedAt: timestamp,
    updatedAtLabel: formatActivityLabel(timestamp),
    isPinned: Boolean(payload?.isPinned),
    usageCount: payload?.usageCount ?? 0,
    lastUsedAt: null,
    lastUsedAtLabel: '',
    tags: Array.from(new Set([...(payload?.tags ?? []), payload?.taskName].filter(Boolean))),
    versionHistory:
      payload?.versionHistory?.length > 0
        ? cloneHistory(payload.versionHistory)
        : [
            {
              id: `imported-template-history-${timestamp}`,
              action: '导入模板',
              savedAt: timestamp,
              savedAtLabel: formatActivityLabel(timestamp),
              title,
              description:
                payload?.description || '从外部 JSON 导入的模板入口，可直接继续回填使用。',
              tags: Array.from(
                new Set([...(payload?.tags ?? []), payload?.taskName].filter(Boolean)),
              ),
              contextValues: cloneContextValues(payload?.contextValues),
              generatedVersions: cloneGeneratedVersions(payload?.generatedVersions),
            },
          ],
  };
}

export function restoreTemplateFromHistory(template, historyEntry) {
  return appendTemplateHistory(
    {
      ...template,
      title: historyEntry.title,
      description: historyEntry.description,
      tags: [...(historyEntry.tags ?? [])],
      contextValues: cloneContextValues(historyEntry.contextValues),
      generatedVersions: cloneGeneratedVersions(historyEntry.generatedVersions),
    },
    `回滚到 ${historyEntry.savedAtLabel}`,
  );
}

export function markTemplateUsed(template) {
  const timestamp = Date.now();

  return {
    ...template,
    usageCount: (template.usageCount ?? 0) + 1,
    lastUsedAt: timestamp,
    lastUsedAtLabel: formatActivityLabel(timestamp),
  };
}

export function getTemplateSourceBadge(template) {
  switch (template.sourceType) {
    case 'skill-record':
      return 'Skill Template';
    case 'result-library':
      return 'Result Template';
    case 'workflow-session':
      return 'Workflow Template';
    default:
      return 'Template';
  }
}

export function sortTemplates(templates) {
  return [...templates].sort((left, right) => {
    if (Boolean(left.isPinned) !== Boolean(right.isPinned)) {
      return left.isPinned ? -1 : 1;
    }

    const leftScore = left.lastUsedAt ?? left.updatedAt ?? left.createdAt ?? 0;
    const rightScore = right.lastUsedAt ?? right.updatedAt ?? right.createdAt ?? 0;

    return rightScore - leftScore;
  });
}
