export const workflowStepItems = [
  { id: 'context', label: 'Context Builder' },
  { id: 'prompt', label: 'Prompt Preview' },
  { id: 'output', label: 'AI Output' },
  { id: 'check', label: 'Output Check' },
  { id: 'version', label: 'Version Optimization' },
  { id: 'save', label: 'Save Result' },
];

const stepIdMap = {
  'context-builder': 'context',
  'prompt-preview': 'prompt',
  'ai-output': 'output',
  'output-check': 'check',
  'version-optimization': 'version',
  'save-result': 'save',
  context: 'context',
  prompt: 'prompt',
  output: 'output',
  check: 'check',
  version: 'version',
  save: 'save',
};

export function normalizeStepId(stepId) {
  return stepIdMap[stepId] ?? 'context';
}

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
  {
    id: 'leader-report',
    name: '领导汇报版',
    scene: '适合管理层快速查看目标、结果、风险和下一步动作。',
  },
  {
    id: 'team-sync',
    name: '团队同步版',
    scene: '适合团队例会、跨部门协同和执行同步。',
  },
  {
    id: 'ppt-outline',
    name: 'PPT 大纲版',
    scene: '适合继续扩写成汇报页面结构。',
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

const taskWorkflowTemplates = {
  'project-review': {
    role: '你是一名擅长整理项目复盘、管理层汇报和问题归因的 AI 助理。',
    taskStatement:
      '请把输入信息整理为一份清晰、专业、可继续优化的项目复盘报告。',
    contextDefaults: {
      projectName: 'FlowPilot 工作台交互改版',
      projectBackground:
        '团队希望把 AI 使用入口从普通列表改成更具任务感的工作台，并强化结果沉淀与后续复用。',
      taskGoal:
        '沉淀本次改版的目标、产出、问题和下一步计划，作为后续复盘与展示基础。',
      executionActions:
        '完成气球工作台、工作流执行页、结果沉淀、模板入口和 Skill Records 的核心链路。',
      dataResults:
        '已完成 6 个高频任务入口、6 步工作流结构、结果保存、模板回填和方法记录。',
      issues: '部分页面的信息层级仍可继续优化，真实案例沉淀样本还不够多。',
      causeAnalysis:
        '当前阶段优先打通结构和交互链路，结果层与说明层的细节沉淀还在补强。',
      nextPlan: '统一卡片层级和文案体系，再补充更多真实成果示例。',
      reportAudience: '产品负责人、设计评审成员和协作团队',
    },
  },
  'weekly-report': {
    role: '你是一名擅长组织进展、问题和计划同步的 AI 助理。',
    taskStatement: '请把零散更新整理成结构清晰的周报或月报。',
    contextDefaults: {
      projectName: '内容运营周报整理',
      projectBackground:
        '本周涉及内容上线、渠道合作和转化页优化，需要统一汇总关键信息。',
      taskGoal: '帮助主管和协作方快速理解本周进展、风险和下周动作。',
      executionActions: '汇总内容上线、合作推进、数据变化和待确认事项。',
      dataResults:
        '已上线 8 篇内容，推进 3 个合作渠道，完成 2 个落地页优化。',
      issues: '转化数据回收偏慢，部分协作反馈时间较长。',
      causeAnalysis: '跨渠道节奏不一致，优先级信息没有完全对齐。',
      nextPlan: '补齐转化数据，并生成适合主管查看的精简版汇报。',
      reportAudience: '直属主管、内容运营团队和合作同学',
    },
  },
  'campaign-plan': {
    role: '你是一名擅长拆解活动目标、节奏、资源和协同关系的 AI 助理。',
    taskStatement: '请输出一份可评审、可执行的活动运营方案。',
    contextDefaults: {
      projectName: '暑期增长活动方案',
      projectBackground:
        '团队计划围绕暑期节点推出一轮拉新与激活结合的线上活动。',
      taskGoal: '明确活动目标、人群、渠道动作、资源配置和预期结果。',
      executionActions: '梳理活动主题、触达动作、资源位安排和协同分工。',
      dataResults: '已确定活动周期、主渠道和阶段性目标，待补充预算和分层策略。',
      issues: '资源排期与素材交付仍待确认，用户分层表达不够细。',
      causeAnalysis: '前期资源锁定偏晚，执行边界和优先级还未完全统一。',
      nextPlan: '补齐预算、素材节奏和用户分层，再进入评审版输出。',
      reportAudience: '运营负责人、市场团队和设计执行成员',
    },
  },
  'meeting-notes': {
    role: '你是一名擅长提炼会议结论、待办事项和责任分工的 AI 助理。',
    taskStatement: '请把会议内容整理成清晰的纪要和后续动作清单。',
    contextDefaults: {
      projectName: '跨部门项目同步会',
      projectBackground:
        '会议围绕项目进度、协同风险和下周计划展开，需要会后快速同步。',
      taskGoal: '形成可直接分发的会后纪要，减少反复确认成本。',
      executionActions: '提炼结论、待办、责任人、截止时间和待确认问题。',
      dataResults: '已确认 4 个动作项、3 位责任人和 2 个待补充风险点。',
      issues: '部分决策口径还不够统一，少量会后信息需要补充。',
      causeAnalysis: '会前背景资料准备不充分，现场花了较多时间做背景对齐。',
      nextPlan: '会后补齐待确认事项，并同步给项目负责人和协作接口人。',
      reportAudience: '项目负责人、接口人和执行成员',
    },
  },
  'competitor-analysis': {
    role: '你是一名擅长搭建竞品分析维度、输出观点和汇报结构的 AI 助理。',
    taskStatement:
      '请输出一份结构清晰、便于继续补充的竞品分析框架。',
    contextDefaults: {
      projectName: 'AI 工作流工具竞品观察',
      projectBackground:
        '团队需要快速理解同类 AI 工具在任务组织、执行引导和结果沉淀上的差异。',
      taskGoal: '沉淀一份可复用的竞品分析框架与阶段性结论。',
      executionActions: '确定分析维度、拆解差异点、整理优劣势和可借鉴方向。',
      dataResults: '已梳理 5 个分析维度、4 个竞品和阶段性观察结论。',
      issues: '深层使用证据仍偏少，部分结论还需要更多样本支撑。',
      causeAnalysis: '当前更多依赖公开信息和短时试用，连续观察样本不足。',
      nextPlan: '补充场景化样本，再扩写为正式评审版分析结论。',
      reportAudience: '产品团队、设计团队和策略讨论成员',
    },
  },
  'ppt-outline': {
    role: '你是一名擅长梳理汇报结构、页面节奏和叙事逻辑的 AI 助理。',
    taskStatement: '请输出一份适合继续制作演示文稿的 PPT 大纲。',
    contextDefaults: {
      projectName: '季度工作汇报 PPT',
      projectBackground:
        '需要把复杂资料整理成适合演示的汇报结构，方便后续完成页面制作。',
      taskGoal: '形成清晰的大纲结构，明确页面顺序、重点信息和讲述节奏。',
      executionActions: '梳理汇报目的、对象、结论、支撑信息和页面顺序。',
      dataResults: '已确认主线结构和 6 个关键页面方向。',
      issues: '部分页仍缺少数据支撑，个别观点的表达还不够稳。',
      causeAnalysis: '前置信息分散，当前阶段先完成结构收束，细节仍待补充。',
      nextPlan: '补齐数据和备注说明，再继续细化为正式演示版本。',
      reportAudience: '管理层、业务评审会和协作团队',
    },
  },
};

function createVersion(id, preview) {
  const catalogItem = versionCatalog.find((item) => item.id === id);

  return {
    id,
    name: catalogItem?.name ?? id,
    scene: catalogItem?.scene ?? '',
    preview,
  };
}

function createWorkflowRecord({
  id,
  taskId,
  taskName,
  status,
  currentStepId,
  savedAtLabel,
  sourceLabel,
  summary,
  skillTags,
  contextValues,
  generatedVersions,
  linkedResultId,
  linkedSkillRecordId,
}) {
  return {
    id,
    taskId,
    taskName,
    status,
    currentStepId,
    currentStepLabel: getStepLabel(currentStepId),
    savedAtLabel,
    sourceType: 'workflow-library',
    sourceLabel,
    summary,
    skillTags,
    contextValues,
    generatedVersions,
    linkedResultId,
    linkedSkillRecordId,
  };
}

function createResultRecord({
  id,
  taskId,
  taskName,
  title,
  resultType,
  versionLabel,
  qualitySummary,
  savedAtLabel,
  sourceLabel,
  audience,
  summary,
  nextPlan,
  contextValues,
  generatedVersions,
  linkedWorkflowId,
  linkedSkillRecordId,
}) {
  return {
    id,
    taskId,
    taskName,
    title,
    resultType,
    versionLabel,
    qualitySummary,
    savedAtLabel,
    sourceType: 'result-library',
    sourceLabel,
    audience,
    summary,
    nextPlan,
    currentStepId: 'save-result',
    currentStepLabel: 'Save Result',
    contextValues,
    generatedVersions,
    linkedWorkflowId,
    linkedSkillRecordId,
  };
}

const projectReviewContext = {
  ...taskWorkflowTemplates['project-review'].contextDefaults,
};

const weeklyReportContext = {
  ...taskWorkflowTemplates['weekly-report'].contextDefaults,
};

const campaignPlanContext = {
  ...taskWorkflowTemplates['campaign-plan'].contextDefaults,
};

const meetingNotesContext = {
  ...taskWorkflowTemplates['meeting-notes'].contextDefaults,
};

const competitorAnalysisContext = {
  ...taskWorkflowTemplates['competitor-analysis'].contextDefaults,
};

const pptOutlineContext = {
  ...taskWorkflowTemplates['ppt-outline'].contextDefaults,
};

export const initialWorkflowLibrary = [
  createWorkflowRecord({
    id: 'workflow-project-review-demo',
    taskId: 'project-review',
    taskName: '项目复盘报告',
    status: '已保存',
    currentStepId: 'save-result',
    savedAtLabel: '6月19日 14:20',
    sourceLabel: '来自项目复盘入口',
    summary: 'FlowPilot 工作台改版已经形成一版可复用的项目复盘结构。',
    skillTags: ['Context Expression', 'Output Check', 'Workflow Reuse'],
    contextValues: projectReviewContext,
    generatedVersions: [
      createVersion('leader-report', '突出目标、结果、风险和后续建议。'),
      createVersion('team-sync', '适合同步给设计、研发和产品协作成员。'),
    ],
    linkedResultId: 'result-project-review-leader',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  }),
  createWorkflowRecord({
    id: 'workflow-weekly-report-demo',
    taskId: 'weekly-report',
    taskName: '周报月报生成',
    status: '待优化',
    currentStepId: 'version-optimization',
    savedAtLabel: '6月20日 17:40',
    sourceLabel: '来自 Results Library 恢复',
    summary: '内容运营周报已整理完成，正在扩展适合不同沟通对象的版本。',
    skillTags: ['Context Expression', 'Version Optimization'],
    contextValues: weeklyReportContext,
    generatedVersions: [
      createVersion('team-sync', '适合团队例会同步本周进展与风险。'),
      createVersion('email-notice', '适合通过邮件同步给协作方。'),
    ],
    linkedResultId: 'result-weekly-report-team',
    linkedSkillRecordId: 'skill-record-weekly-report-demo',
  }),
  createWorkflowRecord({
    id: 'workflow-campaign-plan-demo',
    taskId: 'campaign-plan',
    taskName: '活动运营方案',
    status: '进行中',
    currentStepId: 'prompt-preview',
    savedAtLabel: '6月21日 11:05',
    sourceLabel: '来自活动方案入口',
    summary: '暑期增长活动方案正在整理目标、人群、渠道节奏与资源安排。',
    skillTags: ['Prompt Structure', 'Version Optimization'],
    contextValues: campaignPlanContext,
    generatedVersions: [],
    linkedResultId: '',
    linkedSkillRecordId: '',
  }),
  createWorkflowRecord({
    id: 'workflow-meeting-notes-demo',
    taskId: 'meeting-notes',
    taskName: '会议纪要整理',
    status: '进行中',
    currentStepId: 'output-check',
    savedAtLabel: '6月21日 19:10',
    sourceLabel: '来自会议纪要入口',
    summary: '跨部门同步会纪要已形成初稿，正在检查责任人和时间节点。',
    skillTags: ['Context Expression', 'Output Check'],
    contextValues: meetingNotesContext,
    generatedVersions: [createVersion('email-notice', '适合会后直接同步给参会同学。')],
    linkedResultId: 'result-meeting-notes-email',
    linkedSkillRecordId: 'skill-record-meeting-notes-demo',
  }),
  createWorkflowRecord({
    id: 'workflow-competitor-analysis-demo',
    taskId: 'competitor-analysis',
    taskName: '竞品分析框架',
    status: '待优化',
    currentStepId: 'save-result',
    savedAtLabel: '6月21日 21:15',
    sourceLabel: '来自分析研究入口',
    summary: '竞品分析框架已保存，可继续补充证据样本和评审结论。',
    skillTags: ['Prompt Structure', 'Workflow Reuse'],
    contextValues: competitorAnalysisContext,
    generatedVersions: [
      createVersion('leader-report', '适合快速汇报竞品差异与启发。'),
      createVersion('ppt-outline', '适合继续扩写为分析演示结构。'),
    ],
    linkedResultId: 'result-competitor-analysis-report',
    linkedSkillRecordId: 'skill-record-competitor-analysis-demo',
  }),
  createWorkflowRecord({
    id: 'workflow-ppt-outline-demo',
    taskId: 'ppt-outline',
    taskName: '汇报 PPT 大纲',
    status: '已保存',
    currentStepId: 'save-result',
    savedAtLabel: '6月18日 09:30',
    sourceLabel: '来自汇报大纲入口',
    summary: '季度汇报大纲已沉淀，可继续细化成正式演示文稿。',
    skillTags: ['Version Optimization', 'Prompt Structure'],
    contextValues: pptOutlineContext,
    generatedVersions: [
      createVersion('ppt-outline', '适合继续搭建页面结构。'),
      createVersion('summary-300', '适合先给负责人同步摘要。'),
    ],
    linkedResultId: 'result-ppt-outline-deck',
    linkedSkillRecordId: 'skill-record-ppt-outline-demo',
  }),
];

export const initialResultsLibrary = [
  createResultRecord({
    id: 'result-project-review-leader',
    taskId: 'project-review',
    taskName: '项目复盘报告',
    title: 'FlowPilot 工作台交互改版复盘',
    resultType: '报告',
    versionLabel: '领导汇报版',
    qualitySummary: '结构完整，可直接复用。',
    savedAtLabel: '6月19日 14:20',
    sourceLabel: '来自 My Workflows',
    audience: '产品负责人、设计评审成员',
    summary: '围绕目标、产出、问题和下一步计划形成一版可汇报的复盘结果。',
    nextPlan: '补充更多真实使用反馈后进入正式归档。',
    contextValues: projectReviewContext,
    generatedVersions: [
      createVersion('leader-report', '适合管理层快速查看改版价值与后续建议。'),
      createVersion('team-sync', '适合同步给设计与研发协作成员。'),
    ],
    linkedWorkflowId: 'workflow-project-review-demo',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  }),
  createResultRecord({
    id: 'result-project-review-team',
    taskId: 'project-review',
    taskName: '项目复盘报告',
    title: 'FlowPilot 改版团队同步稿',
    resultType: '报告',
    versionLabel: '团队同步版',
    qualitySummary: '数据支撑需补充。',
    savedAtLabel: '6月19日 14:35',
    sourceLabel: '来自 Results Library',
    audience: '设计、研发和产品团队',
    summary: '强调本次改版的协作节奏、已完成事项与待补充动作。',
    nextPlan: '补齐更多验证样本和使用反馈。',
    contextValues: projectReviewContext,
    generatedVersions: [createVersion('team-sync', '适合内部协作同步。')],
    linkedWorkflowId: 'workflow-project-review-demo',
    linkedSkillRecordId: 'skill-record-project-review-demo',
  }),
  createResultRecord({
    id: 'result-weekly-report-team',
    taskId: 'weekly-report',
    taskName: '周报月报生成',
    title: '内容运营周报整理',
    resultType: '报告',
    versionLabel: '团队同步版',
    qualitySummary: '结构完整，可直接复用。',
    savedAtLabel: '6月20日 17:40',
    sourceLabel: '来自 My Workflows',
    audience: '直属主管、内容运营团队',
    summary: '把本周上线内容、合作推进和转化优化整理成一版结构清晰的周报。',
    nextPlan: '补齐转化数据后生成领导汇报版。',
    contextValues: weeklyReportContext,
    generatedVersions: [
      createVersion('team-sync', '适合周会同步。'),
      createVersion('email-notice', '适合邮件同步给协作方。'),
    ],
    linkedWorkflowId: 'workflow-weekly-report-demo',
    linkedSkillRecordId: 'skill-record-weekly-report-demo',
  }),
  createResultRecord({
    id: 'result-campaign-plan-review',
    taskId: 'campaign-plan',
    taskName: '活动运营方案',
    title: '暑期增长活动评审版方案',
    resultType: '方案',
    versionLabel: '正式报告版',
    qualitySummary: '用户分层需补充。',
    savedAtLabel: '6月21日 12:10',
    sourceLabel: '来自活动方案工作流',
    audience: '运营负责人、市场团队',
    summary: '明确活动目标、渠道节奏、资源安排和阶段性评审重点。',
    nextPlan: '继续补齐预算边界和人群分层说明。',
    contextValues: campaignPlanContext,
    generatedVersions: [
      createVersion('formal-report', '适合评审版输出。'),
      createVersion('ppt-outline', '适合继续制作提案演示。'),
    ],
    linkedWorkflowId: 'workflow-campaign-plan-demo',
    linkedSkillRecordId: 'skill-record-campaign-plan-demo',
  }),
  createResultRecord({
    id: 'result-meeting-notes-email',
    taskId: 'meeting-notes',
    taskName: '会议纪要整理',
    title: '跨部门同步会会后纪要',
    resultType: '纪要',
    versionLabel: '邮件通知版',
    qualitySummary: '责任人清晰，可直接分发。',
    savedAtLabel: '6月21日 19:10',
    sourceLabel: '来自会议纪要工作流',
    audience: '项目负责人、相关接口人',
    summary: '整理出会后待办、责任人和需要再次确认的风险事项。',
    nextPlan: '补齐 2 项待确认动作后再次同步。',
    contextValues: meetingNotesContext,
    generatedVersions: [
      createVersion('email-notice', '适合会后邮件同步。'),
      createVersion('summary-300', '适合消息摘要同步。'),
    ],
    linkedWorkflowId: 'workflow-meeting-notes-demo',
    linkedSkillRecordId: 'skill-record-meeting-notes-demo',
  }),
  createResultRecord({
    id: 'result-competitor-analysis-report',
    taskId: 'competitor-analysis',
    taskName: '竞品分析框架',
    title: 'AI 工作流产品竞品观察',
    resultType: '分析',
    versionLabel: '领导汇报版',
    qualitySummary: '结论清晰，证据层仍可补充。',
    savedAtLabel: '6月21日 21:15',
    sourceLabel: '来自分析研究工作流',
    audience: '产品团队、策略讨论成员',
    summary: '围绕任务入口、执行引导和结果沉淀能力形成阶段性竞品判断。',
    nextPlan: '补充更多场景化样本，再进入正式评审版。',
    contextValues: competitorAnalysisContext,
    generatedVersions: [
      createVersion('leader-report', '适合策略讨论快速同步。'),
      createVersion('ppt-outline', '适合扩写成演示结构。'),
    ],
    linkedWorkflowId: 'workflow-competitor-analysis-demo',
    linkedSkillRecordId: 'skill-record-competitor-analysis-demo',
  }),
  createResultRecord({
    id: 'result-ppt-outline-deck',
    taskId: 'ppt-outline',
    taskName: '汇报 PPT 大纲',
    title: '季度工作汇报大纲',
    resultType: 'PPT',
    versionLabel: 'PPT 大纲版',
    qualitySummary: '结构完整，可继续扩写为页面。',
    savedAtLabel: '6月18日 09:30',
    sourceLabel: '来自汇报大纲工作流',
    audience: '管理层、业务评审会',
    summary: '将汇报内容整理为 6 页主线结构，便于继续制作演示稿。',
    nextPlan: '补齐每页的数据支持和备注说明。',
    contextValues: pptOutlineContext,
    generatedVersions: [
      createVersion('ppt-outline', '适合继续搭建演示页面。'),
      createVersion('summary-300', '适合先同步摘要结论。'),
    ],
    linkedWorkflowId: 'workflow-ppt-outline-demo',
    linkedSkillRecordId: 'skill-record-ppt-outline-demo',
  }),
  createResultRecord({
    id: 'result-campaign-plan-summary',
    taskId: 'campaign-plan',
    taskName: '活动运营方案',
    title: '暑期活动方案摘要版',
    resultType: '方案',
    versionLabel: '300 字摘要版',
    qualitySummary: '结构清晰，但渠道动作仍可更具体。',
    savedAtLabel: '6月21日 16:55',
    sourceLabel: '来自活动方案工作流',
    audience: '运营负责人',
    summary: '保留目标、人群、节奏和资源动作的精简版活动方案摘要。',
    nextPlan: '继续生成正式报告版和 PPT 大纲版。',
    contextValues: campaignPlanContext,
    generatedVersions: [
      createVersion('summary-300', '适合快速评审。'),
      createVersion('ppt-outline', '适合转写为演示结构。'),
    ],
    linkedWorkflowId: 'workflow-campaign-plan-demo',
    linkedSkillRecordId: 'skill-record-campaign-plan-demo',
  }),
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
  const normalizedStepId = normalizeStepId(stepId);
  return workflowStepItems.find((step) => step.id === normalizedStepId)?.label ?? 'Context Builder';
}

export function buildPromptSections(task, contextValues) {
  const template = getWorkflowTemplate(task.id);
  const projectName = contextValues.projectName || task.name;

  return [
    { title: 'Role', content: template.role },
    {
      title: 'Task',
      content: `${template.taskStatement} 当前任务主题是“${projectName}”。`,
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
      content:
        '请按项目背景、项目目标、执行动作、当前结果、问题分析和下一步计划的顺序输出，并保留清晰小标题。',
    },
    {
      title: 'Constraints',
      content: `语言要专业、清晰、便于汇报；避免空泛判断；根据汇报对象 ${contextValues.reportAudience || '待补充'} 调整语气和详略层级。`,
    },
    {
      title: 'Quality Criteria',
      content:
        '结果应体现数据支撑、对象匹配、逻辑完整和下一步可执行性，避免只有结论没有依据。',
    },
  ];
}

const outputFieldMap = [
  { id: 'background', title: '项目背景', source: 'projectBackground' },
  { id: 'actions', title: '执行动作', source: 'executionActions' },
  { id: 'results', title: '当前结果', source: 'dataResults' },
  { id: 'issues', title: '问题分析', source: 'causeAnalysis' },
  { id: 'next', title: '下一步计划', source: 'nextPlan' },
];

export function buildAiOutputDraft(task, contextValues) {
  return outputFieldMap.map((section) => ({
    id: section.id,
    title: section.title,
    content: contextValues[section.source] || `待补充${section.title}`,
  }));
}

const getTextLength = (value = '') => value.trim().replace(/\s+/g, '').length;

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
          ? '背景和执行动作已经足够具体，可以支持后续结构化输出。'
          : '建议把背景和执行动作写得更具体，避免结果停留在抽象描述。',
    },
    {
      label: '数据支撑',
      status: hasDataSupport ? '充分' : '需补充',
      note: hasDataSupport
        ? '当前结果已经包含可支撑结论的阶段性数据或事实。'
        : '建议补充数量、周期、变化或对比结果，让结论更有依据。',
    },
    {
      label: '对象匹配',
      status: hasAudience ? '充分' : '存在风险',
      note: hasAudience
        ? `已明确面向 ${contextValues.reportAudience}，更容易控制语气和信息密度。`
        : '尚未明确汇报对象，容易导致语气和内容层级不匹配。',
    },
    {
      label: '逻辑完整',
      status: hasIssues && hasReasons ? '充分' : '需补充',
      note:
        hasIssues && hasReasons
          ? '问题表现和原因分析都已覆盖，逻辑链路相对完整。'
          : '建议同时补齐问题和原因分析，避免只有现象没有解释。',
    },
    {
      label: '下一步计划',
      status: hasNextPlan ? '充分' : '存在风险',
      note: hasNextPlan
        ? '已经给出明确动作方向，结果可以继续承接后续推进。'
        : '当前缺少清晰的下一步动作，不利于继续执行。',
    },
    {
      label: '可提交度',
      status: completedFields >= 7 && hasAudience && hasDataSupport ? '充分' : '需补充',
      note:
        completedFields >= 7 && hasAudience && hasDataSupport
          ? `${task.name} 当前内容已经具备较好的提交基础。`
          : '建议再补齐关键字段后再提交，避免一次生成即结束。',
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
    'leader-report': `围绕“${baseName}”提炼目标、结果、风险和决策建议，突出 ${summary}。`,
    'team-sync': `从协作推进视角同步当前进展、问题和责任安排，重点说明 ${nextPlan}。`,
    'ppt-outline':
      '整理为 6 页左右的汇报大纲，依次覆盖背景、目标、动作、结果、问题和下一步计划。',
    'summary-300':
      '将当前任务压缩成一段 300 字摘要，突出目标、阶段结果和后续动作。',
    'formal-report':
      '扩写为正式报告结构，补齐背景、过程、结果、问题分析和建议部分。',
    'email-notice':
      '转写为适合邮件通知的正文，突出关键信息、责任人和需要同步的动作。',
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
    currentStepId: normalizeStepId(overrides.currentStepId ?? workflowStepItems[0].id),
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
  const normalizedStepId = normalizeStepId(session.currentStepId);
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
  const timestamp = Date.now();
  const workflowId = session.linkedWorkflowId || `${task.id}-${timestamp}-workflow`;
  const resultId = session.linkedResultId || `${task.id}-${timestamp}-result`;
  const skillId = session.linkedSkillRecordId || `${task.id}-${timestamp}-skill`;

  return {
    savedAtLabel,
    workflowEntry: {
      id: workflowId,
      taskId: task.id,
      taskName: task.name,
      status: normalizedStepId === 'save' ? '已保存' : '待优化',
      currentStepId: normalizedStepId,
      currentStepLabel: getStepLabel(normalizedStepId),
      contextValues: session.contextValues,
      generatedVersions,
      summary: `${session.contextValues.projectName || task.name} 已形成可继续复用的工作流记录。`,
      savedAtLabel,
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      skillTags: task.skillTags,
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
        riskItems.length > 0
          ? `当前仍需补充：${riskItems.join('、')}`
          : '结构完整，可直接复用。',
      generatedVersions,
      savedAtLabel,
      contextValues: session.contextValues,
      currentStepId: normalizedStepId,
      currentStepLabel: getStepLabel(normalizedStepId),
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
        riskItems.length > 0
          ? `使用了 Output Check：发现结果在 ${riskItems.join('、')} 上仍需补充`
          : '使用了 Output Check：确认结果已经具备较好的提交基础',
        versionNames.length > 0
          ? `使用了 Version Optimization：生成了${versionNames.join('、')}`
          : '使用了 Version Optimization：当前还没有额外版本，建议补一个沟通场景版本',
      ],
      issue: riskItems.length > 0 ? riskItems.join('、') : '当前没有明显风险项',
      suggestion:
        versionNames.length > 0
          ? '可以把当前上下文和版本输出沉淀为后续模板入口。'
          : '建议至少生成一个汇报版和一个同步版，方便后续复用。',
      contextValues: session.contextValues,
      generatedVersions,
      currentStepId: normalizedStepId,
      sourceType: session.sourceType,
      sourceLabel: session.sourceLabel,
      linkedWorkflowId: workflowId,
      linkedResultId: resultId,
    },
  };
}
