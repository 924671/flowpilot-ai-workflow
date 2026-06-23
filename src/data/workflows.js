export const workflowStepItems = [
  { id: 'context', label: '上下文构建' },
  { id: 'prompt', label: 'Prompt 预览' },
  { id: 'session', label: 'AI 协作工作区' },
  { id: 'output', label: 'AI 输出' },
  { id: 'check', label: '输出质检' },
  { id: 'version', label: '版本优化' },
  { id: 'save', label: '保存结果' },
];

const stepIdMap = {
  'context-builder': 'context',
  'prompt-preview': 'prompt',
  'ai-work-session': 'session',
  'ai-output': 'output',
  'output-check': 'check',
  'version-optimization': 'version',
  'save-result': 'save',
  context: 'context',
  prompt: 'prompt',
  session: 'session',
  output: 'output',
  check: 'check',
  version: 'version',
  save: 'save',
};

export function normalizeStepId(stepId) {
  return stepIdMap[stepId] ?? 'context';
}

export function getStepLabel(stepId) {
  const normalizedStepId = normalizeStepId(stepId);
  return workflowStepItems.find((step) => step.id === normalizedStepId)?.label ?? '上下文构建';
}

const versionCatalog = [
  {
    id: 'leader-report',
    name: '领导汇报版',
    scene: '面向管理层快速查看目标、结果、风险和下一步动作。',
  },
  {
    id: 'team-sync',
    name: '团队同步版',
    scene: '适合团队例会、跨部门协同和执行同步。',
  },
  {
    id: 'ppt-outline',
    name: 'PPT 大纲版',
    scene: '适合继续扩展成汇报页面结构。',
  },
  {
    id: 'summary-300',
    name: '300 字摘要版',
    scene: '适合消息同步、摘要说明和快速确认。',
  },
  {
    id: 'formal-report',
    name: '正式报告版',
    scene: '适合归档、提交或正式评审。',
  },
  {
    id: 'email-notice',
    name: '邮件通知版',
    scene: '适合会后同步、跨部门通知和正式分发。',
  },
];

export function getVersionCatalog() {
  return versionCatalog;
}

const defaultContextByTask = {
  'project-review': {
    projectName: 'FlowPilot 工作台交互改版',
    projectBackground: '团队希望把 AI 使用入口从普通列表改成更有任务感的工作台，并强化结果沉淀与后续复用。',
    taskGoal: '沉淀本次改版的目标、产出、问题和下一步计划，作为后续复盘与展示基础。',
    executionActions: '完成气球工作台、工作流执行页、结果保存、模板回填和方法记录的核心链路。',
    dataResults: '已完成 6 个高频任务入口、7 步工作流结构、结果保存、模板回填和方法记录。',
    rawMaterials: '页面截图、交互路径、阶段需求说明和本地 mock 数据。',
    keyConclusion: '工作流闭环已经跑通，下一步重点是统一细节和增强真实案例。',
    issues: '部分页面的信息层级仍可继续优化，真实案例沉淀样本还不够多。',
    causeAnalysis: '当前阶段优先打通结构和交互链路，结果层与说明层细节仍在补强。',
    nextPlan: '统一卡片层级和文案体系，再补充更多真实成果示例。',
    reportAudience: '产品负责人、设计评审成员和协作团队',
  },
  'weekly-report': {
    projectName: '内容运营周报整理',
    projectBackground: '本周涉及内容上线、渠道合作和转化页优化，需要统一汇总关键信息。',
    taskGoal: '帮助主管和协作方快速理解本周进展、风险和下周动作。',
    executionActions: '汇总内容上线、合作推进、数据变化和待确认事项。',
    dataResults: '已上线 8 篇内容，推进 3 个合作渠道，完成 2 个落地页优化。',
    rawMaterials: '周会记录、渠道反馈、内容排期和转化页数据。',
    keyConclusion: '整体推进稳定，但转化数据回收和跨团队反馈节奏仍需优化。',
    issues: '转化数据回收偏慢，部分协作反馈时间较长。',
    causeAnalysis: '跨渠道节奏不一致，优先级信息没有完全对齐。',
    nextPlan: '补齐转化数据，并生成适合主管查看的精简版汇报。',
    reportAudience: '直属主管、内容运营团队和合作同学',
  },
  'campaign-plan': {
    projectName: '暑期增长活动方案',
    projectBackground: '团队计划围绕暑期节点推出一轮拉新与激活结合的线上活动。',
    taskGoal: '明确活动目标、人群、渠道动作、资源配置和预期结果。',
    executionActions: '梳理活动主题、触达动作、资源位安排和协同分工。',
    dataResults: '已确定活动周期、主渠道和阶段性目标，待补充预算和分层策略。',
    rawMaterials: '活动 brief、渠道资源表、历史活动复盘和预算草案。',
    keyConclusion: '方案主线明确，但需要进一步补齐用户分层和资源边界。',
    issues: '资源排期与素材交付仍待确认，用户分层表达不够细。',
    causeAnalysis: '前期资源锁定偏晚，执行边界和优先级还未完全统一。',
    nextPlan: '补齐预算、素材节奏和用户分层，再进入评审版输出。',
    reportAudience: '运营负责人、市场团队和设计执行成员',
  },
  'meeting-notes': {
    projectName: '跨部门项目同步会',
    projectBackground: '会议围绕项目进度、协同风险和下周计划展开，需要会后快速同步。',
    taskGoal: '形成可直接分发的会后纪要，减少反复确认成本。',
    executionActions: '提炼结论、待办、责任人、截止时间和待确认问题。',
    dataResults: '已确认 4 个行动项、3 位责任人和 2 个待补充风险点。',
    rawMaterials: '会议录音摘要、参会人发言记录和项目进度表。',
    keyConclusion: '本次会议已经形成明确行动项，但仍有部分决策口径待统一。',
    issues: '部分决策口径还不够统一，少量会后信息需要补充。',
    causeAnalysis: '会前背景资料准备不充分，现场花了较多时间做背景对齐。',
    nextPlan: '会后补齐待确认事项，并同步给项目负责人和协作接口人。',
    reportAudience: '项目负责人、接口人和执行成员',
  },
  'competitor-analysis': {
    projectName: 'AI 工作流工具竞品观察',
    projectBackground: '团队需要快速理解同类 AI 工具在任务组织、执行引导和结果沉淀上的差异。',
    taskGoal: '沉淀一份可复用的竞品分析框架与阶段性结论。',
    executionActions: '确定分析维度、拆解差异点、整理优劣势和可借鉴方向。',
    dataResults: '已梳理 5 个分析维度、4 个竞品和阶段性观察结论。',
    rawMaterials: '竞品官网、公开资料、试用记录和截图。',
    keyConclusion: '任务入口和方法沉淀是 FlowPilot 可以形成差异化的重点。',
    issues: '深层使用证据仍偏少，部分结论还需要更多样本支撑。',
    causeAnalysis: '当前更多依赖公开信息和短时试用，连续观察样本不足。',
    nextPlan: '补充场景化样本，再扩写为正式评审版分析结论。',
    reportAudience: '产品团队、设计团队和策略讨论成员',
  },
  'ppt-outline': {
    projectName: '季度工作汇报 PPT',
    projectBackground: '需要把复杂资料整理成适合演示的汇报结构，方便后续完成页面制作。',
    taskGoal: '形成清晰的大纲结构，明确页面顺序、重点信息和讲述节奏。',
    executionActions: '梳理汇报目的、对象、结论、支撑信息和页面顺序。',
    dataResults: '已确认主线结构和 6 个关键页面方向。',
    rawMaterials: '项目进度、数据摘要、复盘材料和业务反馈。',
    keyConclusion: '当前已具备完整叙事骨架，后续需要补充每页证据。',
    issues: '部分页仍缺少数据支撑，个别观点表达还不够稳定。',
    causeAnalysis: '前置信息分散，当前阶段先完成结构收束，细节仍待补充。',
    nextPlan: '补齐数据和备注说明，再继续细化为正式演示版本。',
    reportAudience: '管理层、业务评审会和协作团队',
  },
};

const taskNameMap = {
  'project-review': '项目复盘报告',
  'weekly-report': '周报月报生成',
  'campaign-plan': '活动运营方案',
  'meeting-notes': '会议纪要整理',
  'competitor-analysis': '竞品分析框架',
  'ppt-outline': '汇报 PPT 大纲',
};

export function getWorkflowTemplate(taskId) {
  return {
    contextDefaults: defaultContextByTask[taskId] ?? defaultContextByTask['project-review'],
  };
}

export function getContextFields(contextValues) {
  const labels = {
    projectName: '项目名称',
    projectBackground: '项目背景',
    taskGoal: '项目目标',
    executionActions: '执行动作',
    dataResults: '数据结果',
    rawMaterials: '原始素材',
    keyConclusion: '关键结论',
    issues: '待处理问题',
    causeAnalysis: '原因分析',
    nextPlan: '下一步计划',
    reportAudience: '汇报对象',
  };

  return Object.entries(labels).map(([key, label]) => ({
    key,
    label,
    value: contextValues[key] ?? '',
  }));
}

export function buildPromptSections(task, contextValues = {}) {
  const pending = '待补充';

  return [
    { title: 'Role', content: `你是一名擅长处理“${task.name}”的 AI 工作流助手。` },
    { title: 'Task', content: `围绕“${contextValues.projectName || task.name}”完成当前任务。` },
    {
      title: 'Context',
      content: `背景：${contextValues.projectBackground || pending}；目标：${contextValues.taskGoal || pending}；对象：${contextValues.reportAudience || pending}。`,
    },
    {
      title: 'Input Materials',
      content: `动作：${contextValues.executionActions || pending}；数据：${contextValues.dataResults || pending}；素材：${contextValues.rawMaterials || pending}。`,
    },
    { title: 'Output Format', content: '按背景、动作、数据、问题、原因、下一步输出。' },
    { title: 'Constraints', content: '不要编造数据，信息不足时标注待补充。' },
    { title: 'Quality Criteria', content: '检查具体度、数据支撑、对象匹配和可提交度。' },
  ];
}

export function buildAiOutputDraft(task, contextValues = {}) {
  return [
    { id: 'background', title: '项目背景', content: contextValues.projectBackground || '待补充项目背景' },
    { id: 'actions', title: '执行动作', content: contextValues.executionActions || '待补充执行动作' },
    { id: 'results', title: '当前结果', content: contextValues.dataResults || '待补充数据结果' },
    { id: 'issues', title: '问题分析', content: contextValues.causeAnalysis || contextValues.issues || '待补充问题分析' },
    { id: 'next', title: '下一步计划', content: contextValues.nextPlan || '待补充下一步计划' },
  ];
}

function getTextLength(value = '') {
  return String(value).trim().replace(/\s+/g, '').length;
}

export function buildOutputChecks(task, contextValues = {}) {
  const dataLength = getTextLength(contextValues.dataResults);
  const hasAudience = getTextLength(contextValues.reportAudience) > 0;
  const hasNextPlan = getTextLength(contextValues.nextPlan) > 0;
  const hasContext =
    getTextLength(contextValues.projectBackground) + getTextLength(contextValues.executionActions) >= 20;

  return [
    {
      label: '具体度',
      status: hasContext ? '充分' : '需补充',
      note: hasContext ? '背景和执行动作较具体。' : '建议补充背景和执行动作。',
    },
    {
      label: '数据支撑',
      status: dataLength === 0 ? '存在风险' : dataLength < 12 ? '需补充' : '充分',
      note:
        dataLength === 0
          ? '缺少数据结果。'
          : dataLength < 12
            ? '已有数据线索，但仍需补充。'
            : '数据可以支撑基础结论。',
    },
    {
      label: '对象匹配',
      status: hasAudience ? '充分' : '需补充',
      note: hasAudience ? `已明确面向“${contextValues.reportAudience}”。` : '需要明确汇报对象。',
    },
    {
      label: '逻辑完整',
      status: getTextLength(contextValues.issues || contextValues.causeAnalysis) > 0 ? '充分' : '需补充',
      note: '建议保留问题识别和原因分析。',
    },
    {
      label: '下一步计划',
      status: hasNextPlan ? '充分' : '存在风险',
      note: hasNextPlan ? '后续动作已具备承接性。' : '缺少下一步计划。',
    },
    {
      label: '可提交度',
      status: dataLength >= 12 && hasAudience && hasNextPlan ? '充分' : '需补充',
      note: '综合判断当前结果是否适合提交或继续生成版本。',
    },
  ];
}

function createVersion(id, preview) {
  const catalogItem = versionCatalog.find((item) => item.id === id);

  return {
    id,
    name: catalogItem?.name ?? id,
    scene: catalogItem?.scene ?? '',
    preview,
  };
}

export function buildGeneratedVersion(task, contextValues = {}, versionId) {
  const version = versionCatalog.find((item) => item.id === versionId);

  if (!version) {
    return null;
  }

  return createVersion(
    version.id,
    `围绕“${contextValues.projectName || task.name}”生成 ${version.name}，重点覆盖目标、结果、问题和后续动作。`,
  );
}

function createWorkflowRecord(taskId, status, stepId, generatedVersions = []) {
  const contextValues = defaultContextByTask[taskId];
  const taskName = taskNameMap[taskId];

  return {
    id: `workflow-${taskId}-demo`,
    taskId,
    taskName,
    status,
    currentStepId: normalizeStepId(stepId),
    currentStepLabel: getStepLabel(stepId),
    savedAtLabel: '6月19日 14:20',
    sourceType: 'workflow-library',
    sourceLabel: `来自${taskName}入口`,
    summary: `${contextValues.projectName} 已形成可继续编辑的工作流记录。`,
    skillTags: ['上下文表达', '输出质检', '流程复用'],
    contextData: contextValues,
    contextValues,
    generatedVersions,
    linkedResultId: `result-${taskId}-demo`,
    linkedSkillRecordId: `skill-record-${taskId}-demo`,
  };
}

function createResultRecord(taskId, type, versionLabel, generatedVersions = []) {
  const contextValues = defaultContextByTask[taskId];
  const workflow = createWorkflowRecord(taskId, '已保存', 'save', generatedVersions);

  return {
    id: `result-${taskId}-demo`,
    taskId,
    taskName: workflow.taskName,
    title: contextValues.projectName,
    resultType: type,
    versionLabel,
    qualitySummary: '结构完整，可继续复用。',
    savedAtLabel: workflow.savedAtLabel,
    sourceType: 'result-library',
    sourceLabel: '来自我的流程',
    audience: contextValues.reportAudience,
    summary: contextValues.keyConclusion || contextValues.dataResults,
    nextPlan: contextValues.nextPlan,
    contextData: contextValues,
    contextValues,
    generatedVersions,
    linkedWorkflowId: workflow.id,
    linkedSkillRecordId: workflow.linkedSkillRecordId,
  };
}

export const initialWorkflowLibrary = [
  createWorkflowRecord('project-review', '已保存', 'save', [
    createVersion('leader-report', '突出目标、结果、风险和后续建议。'),
    createVersion('team-sync', '适合同步给设计、研发和产品协作成员。'),
  ]),
  createWorkflowRecord('weekly-report', '待优化', 'version', [
    createVersion('team-sync', '适合团队例会同步本周进展与风险。'),
  ]),
  createWorkflowRecord('campaign-plan', '进行中', 'prompt', []),
  createWorkflowRecord('meeting-notes', '进行中', 'check', [
    createVersion('email-notice', '适合会后直接同步给参会同学。'),
  ]),
  createWorkflowRecord('competitor-analysis', '待优化', 'save', [
    createVersion('ppt-outline', '适合继续扩写为分析演示结构。'),
  ]),
  createWorkflowRecord('ppt-outline', '已保存', 'save', [
    createVersion('ppt-outline', '适合继续搭建页面结构。'),
  ]),
];

export const initialResultsLibrary = [
  createResultRecord('project-review', '报告', '领导汇报版', [
    createVersion('leader-report', '适合管理层快速查看改版价值与后续建议。'),
  ]),
  createResultRecord('weekly-report', '报告', '团队同步版', [
    createVersion('team-sync', '适合周会同步。'),
  ]),
  createResultRecord('campaign-plan', '方案', '正式报告版', [
    createVersion('formal-report', '适合评审版输出。'),
  ]),
  createResultRecord('meeting-notes', '纪要', '邮件通知版', [
    createVersion('email-notice', '适合会后邮件同步。'),
  ]),
  createResultRecord('competitor-analysis', '分析', 'PPT 大纲版', [
    createVersion('ppt-outline', '适合扩写成分析演示结构。'),
  ]),
  createResultRecord('ppt-outline', 'PPT', 'PPT 大纲版', [
    createVersion('ppt-outline', '适合继续制作演示文稿。'),
  ]),
];

export function createWorkflowSession(task, overrides = {}) {
  const template = getWorkflowTemplate(task.id);
  const contextValues = {
    ...template.contextDefaults,
    ...(overrides.contextData ?? {}),
    ...(overrides.contextValues ?? {}),
  };
  const sessionMessages = overrides.sessionMessages ?? overrides.aiSessionMessages ?? [];
  const sessionOutput = overrides.sessionOutput ?? overrides.aiSessionOutput ?? null;

  return {
    taskId: task.id,
    taskName: task.name,
    currentStepId: normalizeStepId(overrides.currentStepId ?? workflowStepItems[0].id),
    contextData: contextValues,
    contextValues,
    promptData: overrides.promptData ?? null,
    sessionMessages,
    aiSessionMessages: sessionMessages,
    sessionOutput,
    aiSessionOutput: sessionOutput,
    aiOutput: overrides.aiOutput ?? null,
    outputCheck: overrides.outputCheck ?? [],
    generatedVersions: overrides.generatedVersions ?? [],
    savedResult: overrides.savedResult ?? null,
    usedSkills: overrides.usedSkills ?? [],
    isSaved: overrides.isSaved ?? false,
    savedAtLabel: overrides.savedAtLabel ?? '',
    sourceType: overrides.sourceType ?? 'task-entry',
    sourceLabel: overrides.sourceLabel ?? '高频任务入口',
    linkedWorkflowId: overrides.linkedWorkflowId ?? '',
    linkedResultId: overrides.linkedResultId ?? '',
    linkedSkillRecordId: overrides.linkedSkillRecordId ?? '',
    linkedTemplateId: overrides.linkedTemplateId ?? '',
  };
}

export function buildTaskTemplateEntry(record) {
  return {
    id: `${record.id}-template`,
    taskId: record.taskId,
    title: `${record.taskName} 模板入口`,
    description: record.suggestion,
    contextValues: record.contextValues ?? record.contextData,
    generatedVersions: record.generatedVersions ?? [],
    createdFromSkillId: record.id,
    createdAtLabel: record.savedAtLabel,
  };
}

export function buildSaveArtifacts(task, session) {
  const normalizedStepId = normalizeStepId(session.currentStepId);
  const contextValues = session.contextValues ?? session.contextData ?? {};
  const outputChecks =
    Array.isArray(session.outputCheck) && session.outputCheck.length
      ? session.outputCheck
      : buildOutputChecks(task, contextValues);
  const generatedVersions = Array.isArray(session.generatedVersions)
    ? session.generatedVersions
    : [];
  const usedSkills = Array.isArray(session.usedSkills) ? session.usedSkills : [];
  const savedAtLabel = new Intl.DateTimeFormat('zh-CN', {
    month: 'numeric',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());
  const riskItems = outputChecks
    .filter((item) => item.status !== '充分')
    .slice(0, 2)
    .map((item) => item.label);
  const versionNames = generatedVersions.map((item) => item.name).filter(Boolean);
  const timestamp = Date.now();
  const workflowId = session.linkedWorkflowId || `${task.id}-${timestamp}-workflow`;
  const resultId = session.linkedResultId || `${task.id}-${timestamp}-result`;
  const skillId = session.linkedSkillRecordId || `${task.id}-${timestamp}-skill`;
  const commonPayload = {
    contextData: contextValues,
    contextValues,
    promptData: session.promptData ?? null,
    sessionMessages: session.sessionMessages ?? session.aiSessionMessages ?? [],
    aiSessionMessages: session.sessionMessages ?? session.aiSessionMessages ?? [],
    sessionOutput: session.sessionOutput ?? session.aiSessionOutput ?? null,
    aiSessionOutput: session.sessionOutput ?? session.aiSessionOutput ?? null,
    aiOutput: session.aiOutput ?? null,
    outputCheck: outputChecks,
    generatedVersions,
    usedSkills,
  };

  const skillRecords =
    usedSkills.length > 0
      ? usedSkills.map((item) => item.record ?? item)
      : [
          '使用了上下文表达：补充了目标、对象、数据结果和限制条件',
          riskItems.length > 0
            ? `使用了输出质检：发现结果在 ${riskItems.join('、')} 上仍需补充`
            : '使用了输出质检：确认结果已经具备较好的提交基础',
          versionNames.length > 0
            ? `使用了版本优化：生成了${versionNames.join('、')}`
            : '使用了版本优化：准备生成不同沟通场景下的版本',
        ];

  return {
    savedAtLabel,
    workflowEntry: {
      id: workflowId,
      taskId: task.id,
      taskName: task.name,
      status: normalizedStepId === 'save' ? '已保存' : '待优化',
      currentStepId: normalizedStepId,
      currentStepLabel: getStepLabel(normalizedStepId),
      summary: `${contextValues.projectName || task.name} 已形成可继续复用的工作流记录。`,
      savedAtLabel,
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      skillTags: task.skillTags,
      linkedResultId: resultId,
      linkedSkillRecordId: skillId,
      ...commonPayload,
    },
    resultEntry: {
      id: resultId,
      taskId: task.id,
      taskName: task.name,
      title: contextValues.projectName || task.name,
      audience: contextValues.reportAudience,
      summary: session.aiOutput?.summary || contextValues.keyConclusion || contextValues.dataResults,
      nextPlan: contextValues.nextPlan,
      resultType:
        task.id === 'campaign-plan'
          ? '方案'
          : task.id === 'meeting-notes'
            ? '纪要'
            : task.id === 'competitor-analysis'
              ? '分析'
              : task.id === 'ppt-outline'
                ? 'PPT'
                : '报告',
      versionLabel: generatedVersions[0]?.name || '正式结果',
      qualitySummary:
        riskItems.length > 0 ? `当前仍需补充：${riskItems.join('、')}` : '结构完整，可直接复用。',
      savedAtLabel,
      currentStepId: normalizedStepId,
      currentStepLabel: getStepLabel(normalizedStepId),
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      linkedWorkflowId: workflowId,
      linkedSkillRecordId: skillId,
      ...commonPayload,
    },
    skillRecordEntry: {
      id: skillId,
      taskId: task.id,
      taskName: task.name,
      savedAtLabel,
      records: skillRecords,
      issue: riskItems.length > 0 ? riskItems.join('、') : '当前没有明显风险项',
      suggestion:
        versionNames.length > 0
          ? '可以把当前上下文和版本输出沉淀为后续模板入口。'
          : '建议至少生成一个汇报版和一个同步版，方便后续复用。',
      currentStepId: normalizedStepId,
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      linkedWorkflowId: workflowId,
      linkedResultId: resultId,
      ...commonPayload,
    },
  };
}
