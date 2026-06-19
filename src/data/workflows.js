export const workflowStepItems = [
  { id: 'context-builder', label: 'Context Builder' },
  { id: 'prompt-preview', label: 'Prompt Preview' },
  { id: 'ai-output', label: 'AI Output' },
  { id: 'output-check', label: 'Output Check' },
  { id: 'version-optimization', label: 'Version Optimization' },
  { id: 'save-result', label: 'Save Result' },
];

const fieldLabels = {
  projectName: '项目名称',
  projectBackground: '项目背景',
  taskGoal: '项目目标',
  executionActions: '执行动作',
  dataResults: '数据结果',
  issues: '遇到的问题',
  causeAnalysis: '原因分析',
  nextPlan: '下一步计划',
  reportAudience: '汇报对象',
};

const versionCatalog = [
  { id: 'leader-report', name: '领导汇报版', scene: '适合管理层同步和阶段成果汇报' },
  { id: 'team-sync', name: '团队同步版', scene: '适合内部同步当前进度、问题与分工' },
  { id: 'ppt-outline', name: 'PPT 大纲版', scene: '适合转化为演示文稿或汇报页面结构' },
  { id: 'summary-300', name: '300 字摘要版', scene: '适合快速呈现关键结果和主要结论' },
  { id: 'formal-report', name: '正式报告版', scene: '适合输出更完整的复盘报告或阶段总结' },
  { id: 'email-notice', name: '邮件通知版', scene: '适合跨部门邮件同步或正式通知' },
];

const taskWorkflowTemplates = {
  'project-review': {
    role: '你是一名擅长整理项目阶段复盘与管理层汇报结构的 AI 助理。',
    taskStatement: '请基于我提供的信息输出一份用于管理层汇报的项目复盘报告。',
    contextDefaults: {
      projectName: 'FlowPilot 工作台交互改版',
      projectBackground:
        '团队需要将已完成的工作台交互项目整理为可对外汇报的项目复盘报告。',
      taskGoal: '明确这次改版的价值、产出和后续优化方向。',
      executionActions: '完成气球工作台静态页面、交互动效、流程执行壳层和结果沉淀。',
      dataResults: '已支持 6 个高频任务入口、6 步工作流结构和重置演示闭环。',
      issues: '早期页面视觉偏暗，工作台交互状态缺少明确的状态切换。',
      causeAnalysis: '缺少统一的浅色主题变量和工作台中心动线控制。',
      nextPlan: '继续完成上下文表单联动、Prompt 组装和结果沉淀页面。',
      reportAudience: '产品负责人、设计评审会以及研发同步成员',
    },
  },
  'weekly-report': {
    role: '你是一名擅长整理周报月报、提炼进展和下一步计划的 AI 助理。',
    taskStatement: '请输出一份适合团队同步与上级查看的结构化周报。',
    contextDefaults: {
      projectName: '内容运营周报整理',
      projectBackground: '本周涉及多个渠道内容上线，需要统一梳理进展和风险。',
      taskGoal: '形成一份清晰可提交的周报，帮助上级快速了解当前状态。',
      executionActions: '整理项目进展、已完成事项、未完成事项和跨部门协同点。',
      dataResults: '完成 8 篇内容上线，新增 3 个合作渠道，优化 2 个转化页面。',
      issues: '部分内容反馈回收较慢，跨部门确认时间拉长。',
      causeAnalysis: '信息同步节奏不统一，任务优先级说明不够清晰。',
      nextPlan: '补齐数据复盘，明确下周优先级和负责人。',
      reportAudience: '直属主管、内容运营团队和协同部门',
    },
  },
  'campaign-plan': {
    role: '你是一名擅长活动运营拆解、资源配置和执行节奏规划的 AI 助理。',
    taskStatement: '请输出一份适合评审和执行落地的活动运营方案。',
    contextDefaults: {
      projectName: '暑期活动运营方案',
      projectBackground: '团队计划围绕暑期节点推出一次拉新与转化结合的线上活动。',
      taskGoal: '明确活动目标、执行节奏、资源配置和结果预期。',
      executionActions: '梳理活动主题、执行节点、渠道分工和内容安排。',
      dataResults: '已确定活动周期、主要渠道和预估转化目标。',
      issues: '渠道资源协调仍需确认，部分素材制作时间偏紧。',
      causeAnalysis: '活动目标拆解较晚，资源锁定节奏没有前置。',
      nextPlan: '补齐素材排期与负责人，确认活动预热节奏。',
      reportAudience: '运营负责人、市场团队和设计执行成员',
    },
  },
  'meeting-notes': {
    role: '你是一名擅长梳理会议纪要、提炼结论与待办事项的 AI 助理。',
    taskStatement: '请将会议信息整理为清晰的纪要和后续动作清单。',
    contextDefaults: {
      projectName: '跨部门项目同步会',
      projectBackground: '本次会议聚焦项目进度同步、问题拆解和下周分工。',
      taskGoal: '形成一份可直接分发的会议纪要，减少后续重复确认成本。',
      executionActions: '提炼会议结论、责任人、时间点和需要补充确认的事项。',
      dataResults: '已明确 4 个关键动作、3 个责任人和 2 个待确认风险。',
      issues: '部分决策口径在会上表达不够统一。',
      causeAnalysis: '前置材料不充分，问题背景对齐时间较长。',
      nextPlan: '补充会后确认项，并在下一次同步前完善背景材料。',
      reportAudience: '项目负责人、相关部门接口人和会后执行成员',
    },
  },
  'competitor-analysis': {
    role: '你是一名擅长搭建竞品分析框架、提炼差异与输出观点的 AI 助理。',
    taskStatement: '请输出一份结构清晰的竞品分析框架和结论摘要。',
    contextDefaults: {
      projectName: '竞品工作流产品分析',
      projectBackground:
        '团队需要快速评估几个同类 AI 工具在任务组织与沉淀能力上的差异。',
      taskGoal: '沉淀一份适合内部讨论的竞品分析框架。',
      executionActions: '确定分析维度、拆解功能差异、整理优劣势和策略启发。',
      dataResults: '已梳理 5 个分析维度、3 个主要竞品和阶段性结论。',
      issues: '部分竞品的深层使用逻辑缺少长期样本。',
      causeAnalysis: '目前更多来自公开信息与短期试用，缺少持续跟踪数据。',
      nextPlan: '补充场景化对比，并形成内部策略建议。',
      reportAudience: '产品团队、设计团队和战略讨论成员',
    },
  },
  'ppt-outline': {
    role: '你是一名擅长搭建汇报结构、组织页面节奏与演示逻辑的 AI 助理。',
    taskStatement: '请输出一份适合汇报场景的 PPT 结构大纲。',
    contextDefaults: {
      projectName: '季度汇报 PPT 结构',
      projectBackground: '团队需要把复杂信息整理为适合演示的汇报提纲。',
      taskGoal: '形成一份结构稳定、逻辑清晰、适合扩展成页面的汇报大纲。',
      executionActions: '梳理汇报目的、受众、关键论点和页面节奏。',
      dataResults: '已确定核心议题、主线结构和 6 个关键页面方向。',
      issues: '目前部分论点还缺少足够的数据说明。',
      causeAnalysis: '前置材料来源分散，演示导向的结构还未完全收束。',
      nextPlan: '补齐支撑数据，细化页面标题与备注说明。',
      reportAudience: '管理层、业务评审会和跨部门同步成员',
    },
  },
};

const outputFieldMap = [
  { id: 'background', title: '项目背景', source: 'projectBackground' },
  { id: 'actions', title: '执行动作', source: 'executionActions' },
  { id: 'results', title: '当前结果', source: 'dataResults' },
  { id: 'issues', title: '问题分析', source: 'causeAnalysis' },
  { id: 'next', title: '下一步计划', source: 'nextPlan' },
];

export const initialWorkflowLibrary = [
  {
    id: 'workflow-project-review-demo',
    taskId: 'project-review',
    taskName: '项目复盘报告',
    currentStepId: 'save-result',
    currentStepLabel: 'Save Result',
    contextValues: {
      projectName: 'FlowPilot 工作台交互改版',
      projectBackground:
        '团队希望把 AI 工作流入口从普通任务列表改成更清晰的气球工作台，并强化结果沉淀和后续复用。',
      taskGoal: '整理这次改版的目标、产出、问题与后续建议，形成可对外同步的项目复盘结构。',
      executionActions:
        '完成工作台静态视觉、气球交互、流程执行壳层、结果沉淀和模板入口联动。',
      dataResults: '已支持 6 个高频任务入口、6 步 workflow、结果保存、回填恢复和模板复用。',
      issues: '部分结果描述仍偏概括，缺少更细的验证数据和真实使用反馈。',
      causeAnalysis:
        '当前阶段优先打通结构和交互闭环，还没有引入更多样本数据做结果验证。',
      nextPlan: '继续完善 Results Library 的结果查看、版本扩写和详情回填能力。',
      reportAudience: '产品负责人、设计评审成员、研发协同成员',
    },
    generatedVersions: [
      {
        id: 'leader-report',
        name: '领导汇报版',
        scene: '适合管理层同步和阶段成果汇报',
        preview: '围绕改版目标、当前成果、主要风险和后续建议进行简明汇报。',
      },
      {
        id: 'team-sync',
        name: '团队同步版',
        scene: '适合内部同步进展、问题与分工',
        preview: '突出已完成事项、待补充问题和下一阶段分工安排。',
      },
    ],
    summary: 'FlowPilot 工作台交互改版已形成可复用的项目复盘结构。',
    savedAtLabel: '6月19日 14:20',
    sourceType: 'workflow-library',
    sourceLabel: '从 My Workflows 恢复 · Save Result',
    linkedResultId: 'result-project-review-demo',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  },
  {
    id: 'workflow-weekly-report-demo',
    taskId: 'weekly-report',
    taskName: '周报月报生成',
    currentStepId: 'version-optimization',
    currentStepLabel: 'Version Optimization',
    contextValues: {
      projectName: '内容运营周报整理',
      projectBackground: '需要把一周内多个渠道、多个任务的进展统一整理成可提交周报。',
      taskGoal: '让主管快速看懂本周产出、当前问题和下周重点动作。',
      executionActions: '整理内容上线、合作推进、转化优化和跨部门同步情况。',
      dataResults: '完成 8 篇内容上线，新增 3 个合作渠道，优化 2 个转化页面。',
      issues: '部分内容反馈回收较慢，跨部门确认时间偏长。',
      causeAnalysis: '信息同步节奏不统一，优先级说明不够清晰。',
      nextPlan: '补齐数据复盘，明确下周优先级和责任人。',
      reportAudience: '直属主管、内容运营团队',
    },
    generatedVersions: [
      {
        id: 'team-sync',
        name: '团队同步版',
        scene: '适合团队站会或周会同步',
        preview: '突出本周进展、风险项、资源需求与责任人。',
      },
      {
        id: 'email-notice',
        name: '邮件通知版',
        scene: '适合跨部门邮件同步',
        preview: '转写为适合邮件发送的同步正文，保留关键信息和行动项。',
      },
    ],
    summary: '内容运营周报已经完成结构整理，可继续扩写为更多适合不同沟通场景的版本。',
    savedAtLabel: '6月18日 18:40',
    sourceType: 'result-library',
    sourceLabel: '从 Results Library 恢复 · 内容运营周报整理',
    linkedResultId: 'result-weekly-report-demo',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  },
];

export const initialResultsLibrary = [
  {
    id: 'result-project-review-demo',
    taskId: 'project-review',
    taskName: '项目复盘报告',
    title: 'FlowPilot 工作台交互改版',
    audience: '产品负责人、设计评审成员、研发协同成员',
    summary: '已完成工作台气球入口、执行流程、结果沉淀与模板入口联动的第一轮闭环搭建。',
    nextPlan: '继续完善 Results Library 的查看、扩写和回填能力，并补充更多验证样本。',
    qualitySummary: '当前仍需关注：数据支撑、真实反馈样本。',
    generatedVersions: [
      {
        id: 'leader-report',
        name: '领导汇报版',
        scene: '适合管理层同步和阶段成果汇报',
        preview: '围绕改版目标、当前成果、主要风险和后续建议进行简明汇报。',
      },
      {
        id: 'team-sync',
        name: '团队同步版',
        scene: '适合内部同步进展、问题与分工',
        preview: '突出已完成事项、待补充问题和下一阶段分工安排。',
      },
      {
        id: 'ppt-outline',
        name: 'PPT 大纲版',
        scene: '适合转换为演示文稿或汇报页面结构',
        preview: '整理为背景、目标、动作、结果、问题与下一步计划 6 页结构。',
      },
    ],
    savedAtLabel: '6月19日 14:20',
    contextValues: {
      projectName: 'FlowPilot 工作台交互改版',
      projectBackground:
        '团队希望把 AI 工作流入口从普通任务列表改成更清晰的气球工作台，并强化结果沉淀和后续复用。',
      taskGoal: '整理这次改版的目标、产出、问题与后续建议，形成可对外同步的项目复盘结构。',
      executionActions:
        '完成工作台静态视觉、气球交互、流程执行壳层、结果沉淀和模板入口联动。',
      dataResults: '已支持 6 个高频任务入口、6 步 workflow、结果保存、回填恢复和模板复用。',
      issues: '部分结果描述仍偏概括，缺少更细的验证数据和真实使用反馈。',
      causeAnalysis:
        '当前阶段优先打通结构和交互闭环，还没有引入更多样本数据做结果验证。',
      nextPlan: '继续完善 Results Library 的结果查看、版本扩写和详情回填能力。',
      reportAudience: '产品负责人、设计评审成员、研发协同成员',
    },
    currentStepId: 'save-result',
    currentStepLabel: 'Save Result',
    sourceType: 'workflow-library',
    sourceLabel: '从 My Workflows 恢复 · Save Result',
    linkedWorkflowId: 'workflow-project-review-demo',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  },
  {
    id: 'result-weekly-report-demo',
    taskId: 'weekly-report',
    taskName: '周报月报生成',
    title: '内容运营周报整理',
    audience: '直属主管、内容运营团队',
    summary: '将零散进展整合为结构清晰的周报，并补齐问题说明与下周计划。',
    nextPlan: '补充转化数据和跨部门确认节奏，再生成正式汇报版与邮件通知版。',
    qualitySummary: '质检结果整体稳定，可继续生成更适合沟通场景的新版本。',
    generatedVersions: [
      {
        id: 'team-sync',
        name: '团队同步版',
        scene: '适合团队站会或周会同步',
        preview: '突出本周进展、风险项、资源需求与责任人。',
      },
      {
        id: 'email-notice',
        name: '邮件通知版',
        scene: '适合跨部门邮件同步',
        preview: '转写为适合邮件发送的同步正文，保留关键信息和行动项。',
      },
    ],
    savedAtLabel: '6月18日 18:40',
    contextValues: {
      projectName: '内容运营周报整理',
      projectBackground: '需要把一周内多个渠道、多个任务的进展统一整理成可提交周报。',
      taskGoal: '让主管快速看懂本周产出、当前问题和下周重点动作。',
      executionActions: '整理内容上线、合作推进、转化优化和跨部门同步情况。',
      dataResults: '完成 8 篇内容上线，新增 3 个合作渠道，优化 2 个转化页面。',
      issues: '部分内容反馈回收较慢，跨部门确认时间偏长。',
      causeAnalysis: '信息同步节奏不统一，优先级说明不够清晰。',
      nextPlan: '补齐数据复盘，明确下周优先级和责任人。',
      reportAudience: '直属主管、内容运营团队',
    },
    currentStepId: 'version-optimization',
    currentStepLabel: 'Version Optimization',
    sourceType: 'result-library',
    sourceLabel: '从 Results Library 恢复 · 内容运营周报整理',
    linkedWorkflowId: 'workflow-weekly-report-demo',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  },
];

export function getWorkflowTemplate(taskId) {
  return taskWorkflowTemplates[taskId] ?? taskWorkflowTemplates['project-review'];
}

export function getContextFields(contextValues) {
  return Object.entries(fieldLabels).map(([key, label]) => ({
    key,
    label,
    value: contextValues[key] ?? '',
  }));
}

export function getStepLabel(stepId) {
  return workflowStepItems.find((step) => step.id === stepId)?.label ?? 'Context Builder';
}

export function buildPromptSections(task, contextValues) {
  const template = getWorkflowTemplate(task.id);

  return [
    { title: 'Role', content: template.role },
    {
      title: 'Task',
      content: `${template.taskStatement} 当前任务主题是「${contextValues.projectName || task.name}」。`,
    },
    {
      title: 'Context',
      content: `任务背景：${contextValues.projectBackground || '待补充'} 任务目标：${contextValues.taskGoal || '待补充'} 汇报对象：${contextValues.reportAudience || '待补充'}`,
    },
    {
      title: 'Input Materials',
      content: `执行动作：${contextValues.executionActions || '待补充'} 数据结果：${contextValues.dataResults || '待补充'} 遇到的问题：${contextValues.issues || '待补充'} 原因分析：${contextValues.causeAnalysis || '待补充'}`,
    },
    {
      title: 'Output Format',
      content: '请按项目背景、目标、关键动作、结果、问题分析、下一步计划的顺序输出，并保留清晰的小标题。',
    },
    {
      title: 'Constraints',
      content: `语言需要专业、清晰、便于汇报；避免空泛判断；限制条件或边界说明：${contextValues.reportAudience || '待补充对象信息'}`,
    },
    {
      title: 'Quality Criteria',
      content: '结果应体现数据支撑、对象匹配、逻辑完整和下一步可执行性，并避免只有结论没有依据。',
    },
  ];
}

export function buildAiOutputDraft(task, contextValues) {
  return outputFieldMap.map((section) => ({
    id: section.id,
    title: section.title,
    content: contextValues[section.source] || `待补充${section.title}`,
  }));
}

const getTextLength = (value) => value.trim().replace(/\s+/g, '').length;

export function buildOutputChecks(task, contextValues) {
  const specificityLength =
    getTextLength(contextValues.projectBackground) +
    getTextLength(contextValues.executionActions);
  const hasAudience = getTextLength(contextValues.reportAudience) >= 4;
  const hasDataSupport = getTextLength(contextValues.dataResults) >= 12;
  const hasIssues = getTextLength(contextValues.issues) >= 10;
  const hasReasons = getTextLength(contextValues.causeAnalysis) >= 10;
  const hasNextPlan = getTextLength(contextValues.nextPlan) >= 10;
  const completedFields = Object.values(contextValues).filter(
    (value) => getTextLength(value) >= 6,
  ).length;

  return [
    {
      label: '具体度',
      status: specificityLength >= 30 ? '充分' : '需补充',
      note:
        specificityLength >= 30
          ? '背景和执行动作已经足够具体，可以支撑后续结构化输出。'
          : '建议把背景和执行动作写得更具体，避免结果只停留在抽象描述。',
    },
    {
      label: '数据支撑',
      status: hasDataSupport ? '充分' : '需补充',
      note: hasDataSupport
        ? '当前结果已经包含可以支撑结论的数据或阶段性信息。'
        : '建议补充数量、比例、周期或结果变化，让结论更有支撑。',
    },
    {
      label: '对象匹配',
      status: hasAudience ? '充分' : '存在风险',
      note: hasAudience
        ? `已明确面向 ${contextValues.reportAudience}，更容易控制语气与信息密度。`
        : '尚未明确汇报对象，容易导致语气与结构不匹配。',
    },
    {
      label: '逻辑完整',
      status: hasIssues && hasReasons ? '充分' : '需补充',
      note:
        hasIssues && hasReasons
          ? '问题和原因分析都已覆盖，结构链路相对完整。'
          : '建议同时补齐问题表现和原因分析，避免只有现象没有解释。',
    },
    {
      label: '下一步计划',
      status: hasNextPlan ? '充分' : '存在风险',
      note: hasNextPlan
        ? '已经给出下一步动作方向，可直接承接后续计划。'
        : '当前缺少明确的下一步动作，结果不利于继续推进。',
    },
    {
      label: '可提交度',
      status: completedFields >= 7 && hasAudience && hasDataSupport ? '充分' : '需补充',
      note:
        completedFields >= 7 && hasAudience && hasDataSupport
          ? `当前 ${task.name} 内容已经具备较强的提交基础。`
          : '建议再补齐关键字段后提交，避免一次输出直接结束。',
    },
  ];
}

export function getVersionCatalog() {
  return versionCatalog;
}

export function buildGeneratedVersion(task, contextValues, versionId) {
  const version = versionCatalog.find((item) => item.id === versionId);

  if (!version) {
    return null;
  }

  const baseName = contextValues.projectName || task.name;
  const summary = contextValues.dataResults || contextValues.executionActions;
  const nextPlan = contextValues.nextPlan || '待补充下一步安排';

  const previewMap = {
    'leader-report': `围绕「${baseName}」提炼阶段目标、关键结果和后续决策建议，突出 ${summary}。`,
    'team-sync': `以团队协同视角同步当前进展、问题与责任人安排，重点说明 ${nextPlan}。`,
    'ppt-outline': '整理为 6 页左右的汇报大纲，依次覆盖背景、目标、动作、结果、问题和后续计划。',
    'summary-300': '将当前任务内容压缩为一段 300 字摘要，突出目标、结果和下一步动作。',
    'formal-report': '扩写为正式报告结构，补齐背景、过程、结果、问题分析和建议部分。',
    'email-notice': '转写为适合邮件通知的正文，强调关键信息、责任人和需要同步的动作。',
  };

  return {
    id: version.id,
    name: version.name,
    scene: version.scene,
    preview: previewMap[version.id],
  };
}

export function createWorkflowSession(task, overrides = {}) {
  const template = getWorkflowTemplate(task.id);
  const contextValues = {
    ...template.contextDefaults,
    ...(overrides.contextValues ?? {}),
  };

  return {
    taskId: task.id,
    taskName: task.name,
    currentStepId: overrides.currentStepId ?? workflowStepItems[0].id,
    contextValues,
    generatedVersions: overrides.generatedVersions ?? [],
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
    contextValues: record.contextValues,
    generatedVersions: record.generatedVersions ?? [],
    createdFromSkillId: record.id,
    createdAtLabel: record.savedAtLabel,
  };
}

export function buildSaveArtifacts(task, session) {
  const outputChecks = buildOutputChecks(task, session.contextValues);
  const generatedVersions = session.generatedVersions;
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

  const versionNames = generatedVersions.map((item) => item.name);
  const workflowId = session.linkedWorkflowId || `${task.id}-${Date.now()}-workflow`;
  const resultId = session.linkedResultId || `${task.id}-${Date.now()}-result`;
  const skillId = session.linkedSkillRecordId || `${task.id}-${Date.now()}-skill`;

  return {
    savedAtLabel,
    workflowEntry: {
      id: workflowId,
      taskId: task.id,
      taskName: task.name,
      currentStepId: session.currentStepId,
      currentStepLabel: getStepLabel(session.currentStepId),
      contextValues: session.contextValues,
      generatedVersions,
      summary: `${session.contextValues.projectName || task.name} 已形成可复用工作流结构。`,
      savedAtLabel,
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      linkedResultId: resultId,
      linkedSkillRecordId: skillId,
    },
    resultEntry: {
      id: resultId,
      taskId: task.id,
      taskName: task.name,
      title: session.contextValues.projectName || task.name,
      audience: session.contextValues.reportAudience,
      summary: session.contextValues.dataResults,
      nextPlan: session.contextValues.nextPlan,
      qualitySummary:
        riskItems.length > 0
          ? `当前仍需关注：${riskItems.join('、')}`
          : '质检结果整体稳定，可直接继续复用。',
      generatedVersions,
      savedAtLabel,
      contextValues: session.contextValues,
      currentStepId: session.currentStepId,
      currentStepLabel: getStepLabel(session.currentStepId),
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      linkedWorkflowId: workflowId,
      linkedSkillRecordId: skillId,
    },
    skillRecordEntry: {
      id: skillId,
      taskId: task.id,
      taskName: task.name,
      savedAtLabel,
      records: [
        '使用了 Context Expression：补充了目标、对象和限制条件',
        `使用了 Output Check：${
          riskItems.length > 0
            ? `发现结果在 ${riskItems.join('、')} 上仍需补充`
            : '确认结果已具备较好的提交基础'
        }`,
        `使用了 Version Optimization：${
          versionNames.length > 0
            ? `生成了 ${versionNames.join('、')}`
            : '当前还没有生成额外版本，建议至少补充一个适配场景版本'
        }`,
      ],
      issue: riskItems.length > 0 ? riskItems.join('、') : '当前暂无显著风险项',
      suggestion:
        versionNames.length > 0
          ? '可以将已生成版本沉淀为后续复用模板。'
          : '建议至少生成一个汇报版本和一个同步版本，方便后续复用。',
      contextValues: session.contextValues,
      generatedVersions,
      currentStepId: session.currentStepId,
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      linkedWorkflowId: workflowId,
      linkedResultId: resultId,
    },
  };
}
