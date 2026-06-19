export const skillArchiveSections = {
  commonSkills: [
    {
      title: 'Context Expression',
      description: '用于补齐目标、对象、背景与限制条件，帮助 AI 理解任务边界。',
    },
    {
      title: 'Prompt Structure',
      description: '用于把零散信息组织成可执行的 Prompt 结构，减少一次性试错。',
    },
    {
      title: 'Output Check',
      description: '用于检查结果是否具体、有支撑、可提交，而不是直接复制输出。',
    },
    {
      title: 'Version Optimization',
      description: '用于把一份结果转成不同沟通场景下可直接复用的版本。',
    },
  ],
  commonIssues: [
    '数据支撑不足，导致结论看起来可信度不够。',
    '汇报对象不明确，结果语气和信息密度容易失衡。',
    '下一步计划不清楚，任务完成后难以继续推进。',
  ],
  reusableSuggestions: [
    '优先保留填写完整的 Context Builder 表单，作为同类任务的下次输入模板。',
    '将常用版本输出方式固定下来，沉淀成领导汇报版、团队同步版等标准入口。',
    '每次保存前先看 Output Check，把“需补充”和“存在风险”项处理完再沉淀。',
  ],
};

export const initialSkillRecords = [
  {
    id: 'skill-record-project-review-demo',
    taskId: 'project-review',
    taskName: '项目复盘报告',
    savedAtLabel: '6月19日 14:20',
    records: [
      '使用了 Context Expression：补充了目标、对象和限制条件',
      '使用了 Output Check：发现结果缺少数据支撑',
      '使用了 Version Optimization：生成了领导汇报版和团队同步版',
    ],
    issue: '数据支撑不足，部分结论还需要补充更细的验证信息。',
    suggestion: '保留这次复盘表单，作为后续同类项目复盘的模板入口。',
    contextValues: {
      projectName: 'FlowPilot 工作台交互改版',
      projectBackground:
        '团队希望把 AI 工作流入口从普通任务列表改成更明确的任务工作台，并强化后续复用链路。',
      taskGoal:
        '整理本次工作台改版的目标、产出、问题与后续建议，形成可复用的复盘结构。',
      executionActions:
        '完成工作台静态布局、气球交互、流程执行壳层与结果沉淀能力，并补齐模板入口联动。',
      dataResults:
        '已支持 6 个任务入口、6 步工作流、结果保存、恢复编辑与模板回填。',
      issues: '部分结果描述仍偏概括，缺少更细的验证数据与使用反馈。',
      causeAnalysis:
        '当前阶段以流程打通为主，优先覆盖结构与状态联动，暂未引入更多验证样本。',
      nextPlan:
        '补充模板管理、结果导出和更完整的任务回填入口，继续增强工作台闭环。',
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
    currentStepId: 'save-result',
    sourceType: 'workflow-library',
    sourceLabel: '来自 My Workflows',
    linkedWorkflowId: 'workflow-project-review-demo',
    linkedResultId: 'result-project-review-demo',
  },
  {
    id: 'skill-record-weekly-report-demo',
    taskId: 'weekly-report',
    taskName: '周报月报生成',
    savedAtLabel: '6月18日 18:40',
    records: [
      '使用了 Context Expression：补充了进展、问题和下周重点动作',
      '使用了 Prompt Structure：把零散更新组织成适合主管阅读的周报结构',
      '使用了 Version Optimization：生成了团队同步版和邮件通知版',
    ],
    issue: '汇报对象明确后内容更稳定，但数据支撑仍需要再补一层。',
    suggestion: '保留这次周报输入结构，作为后续同类周报和月报的模板入口。',
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
    currentStepId: 'save-result',
    sourceType: 'result-library',
    sourceLabel: '来自 Results Library',
    linkedWorkflowId: 'workflow-weekly-report-demo',
    linkedResultId: 'result-weekly-report-demo',
  },
];
