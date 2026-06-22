import React, { useEffect, useMemo, useState } from 'react';
import EmptyState from '../components/common/EmptyState';
import AIOutput from '../components/workflow/AIOutput';
import AIWorkSession from '../components/workflow/AIWorkSession';
import ContextBuilder from '../components/workflow/ContextBuilder';
import OutputCheck from '../components/workflow/OutputCheck';
import PromptPreview from '../components/workflow/PromptPreview';
import SaveResult from '../components/workflow/SaveResult';
import VersionCards from '../components/workflow/VersionCards';
import WorkflowSteps from '../components/workflow/WorkflowSteps';
import {
  getVersionCatalog,
  normalizeStepId,
  workflowStepItems,
} from '../data/workflows';

const contextFields = [
  { key: 'projectName', label: '项目名称', type: 'input' },
  { key: 'projectBackground', label: '项目背景' },
  { key: 'taskGoal', label: '项目目标' },
  { key: 'executionActions', label: '执行动作' },
  { key: 'dataResults', label: '数据结果' },
  { key: 'rawMaterials', label: '原始素材' },
  { key: 'keyConclusion', label: '关键结论' },
  { key: 'issues', label: '待处理问题' },
  { key: 'causeAnalysis', label: '原因分析' },
  { key: 'nextPlan', label: '下一步计划' },
  { key: 'reportAudience', label: '汇报对象', type: 'input' },
];

const quickActionPrompts = {
  draft: '请先根据当前上下文，帮我生成一版可用于汇报的初稿。',
  data: '请重点检查当前结果里的数据支撑是否充分。',
  next: '请帮我补全下一步计划，让它更可执行。',
  leader: '请改成更适合领导汇报的口吻。',
  ppt: '请把内容改成适合 PPT 汇报的大纲结构。',
};

const versionMeta = {
  'leader-report': {
    summary: '突出目标、结果、风险和决策建议，适合管理层快速判断。',
    suggestions: ['补充关键数据', '明确风险优先级', '提炼下一步动作'],
  },
  'team-sync': {
    summary: '突出当前进展、责任分工、待办事项和风险点，适合团队同步。',
    suggestions: ['明确负责人', '补齐待办节点', '同步跨部门依赖'],
  },
  'ppt-outline': {
    summary: '整理为背景、目标、过程、结果、问题、下一步六页结构。',
    suggestions: ['确认页面节奏', '提炼每页标题', '补充图表建议'],
  },
  'summary-300': {
    summary: '压缩为简洁摘要，保留关键结果和下一步计划。',
    suggestions: ['保留关键数字', '删除重复描述', '突出后续动作'],
  },
  'formal-report': {
    summary: '使用更完整、更正式的报告表达结构，适合归档或提交。',
    suggestions: ['统一章节标题', '完善证据支撑', '检查正式语气'],
  },
  'email-notice': {
    summary: '转换为邮件格式，包含主题、正文、重点事项和后续安排。',
    suggestions: ['补全邮件主题', '精简正文段落', '明确后续安排'],
  },
};

function valueOrPending(value) {
  return value && String(value).trim() ? value : '待补充';
}

function getTextLength(value = '') {
  return String(value).trim().replace(/\s+/g, '').length;
}

function createInitialSessionMessages() {
  return [
    {
      id: 'session-ai-intro',
      role: 'ai',
      content:
        '我已经读取当前任务上下文。你可以让我基于这些信息生成初稿、补充缺失信息，或检查数据支撑是否充分。',
    },
    {
      id: 'session-user-seed',
      role: 'user',
      content: '请根据当前上下文，先帮我整理一版可用于汇报的初稿。',
    },
    {
      id: 'session-ai-seed',
      role: 'ai',
      content:
        '我会先根据项目目标、执行动作和数据结果整理一版结构化初稿。当前数据结果可以支撑基础结论，但如果需要面向管理层汇报，建议补充分渠道数据和对比周期。',
    },
  ];
}

function createMockAiReply(input) {
  if (input.includes('数据')) {
    return '我会优先检查数据是否能支撑结论，并标记需要补充的指标。';
  }

  if (input.includes('领导')) {
    return '我会将表达压缩为管理层更关注的目标、结果、风险和决策建议。';
  }

  if (input.toUpperCase().includes('PPT')) {
    return '我会把内容拆成适合汇报页面的结构，方便后续扩展成演示文稿。';
  }

  return '我会基于当前上下文继续优化输出，并保留可提交的结构。';
}

function buildPromptData(task, contextData = {}) {
  return {
    generatedAt: Date.now(),
    sections: [
      {
        title: 'Role',
        content: `你是一名擅长处理“${task.name}”的 AI 工作流助手，需要帮助职场用户把零散信息整理成可提交结果。`,
      },
      {
        title: 'Task',
        content: `围绕“${valueOrPending(contextData.projectName || task.name)}”完成 ${task.name}，并输出结构清晰、适合继续质检和版本优化的内容。`,
      },
      {
        title: 'Context',
        content: `项目背景：${valueOrPending(contextData.projectBackground)}；项目目标：${valueOrPending(contextData.taskGoal)}；汇报对象：${valueOrPending(contextData.reportAudience)}。`,
      },
      {
        title: 'Input Materials',
        content: `执行动作：${valueOrPending(contextData.executionActions)}；数据结果：${valueOrPending(contextData.dataResults)}；原始素材：${valueOrPending(contextData.rawMaterials)}；待处理问题：${valueOrPending(contextData.issues)}。`,
      },
      {
        title: 'Output Format',
        content:
          '请按“背景说明、执行动作、数据摘要、问题识别、原因分析、下一步计划”输出，并保留清晰小标题。',
      },
      {
        title: 'Constraints',
        content:
          '语言要专业、清晰、不过度夸张；如果信息不足，请明确标注待补充项，不要编造不存在的数据。',
      },
      {
        title: 'Quality Criteria',
        content:
          '结果需要体现具体度、数据支撑、对象匹配、逻辑完整和下一步可执行性。',
      },
      {
        title: 'Processing Requirements',
        content:
          '先整理初稿，再检查数据是否支撑结论，最后根据汇报对象生成不同版本。',
      },
    ],
  };
}

function buildSessionOutput(task, contextData = {}, latestInstruction = '') {
  return {
    sourceInstruction: latestInstruction,
    statusItems: [
      '已读取上下文',
      '已生成初稿建议',
      latestInstruction.includes('数据') ? '正在检查数据支撑' : '数据支撑待检查',
      '可进入 AI Output',
    ],
    summary: `${task.name} 已生成一版可继续质检与版本优化的协作初稿。`,
    sections: [
      {
        id: 'data-summary',
        title: '数据摘要',
        content: valueOrPending(contextData.dataResults),
      },
      {
        id: 'result-interpretation',
        title: '结果解读',
        content: `围绕“${valueOrPending(contextData.taskGoal)}”进行整理，当前输出适合先形成结构化初稿，再进入质检。`,
      },
      {
        id: 'issue-review',
        title: '问题识别',
        content: valueOrPending(contextData.issues || contextData.causeAnalysis),
      },
      {
        id: 'next-actions',
        title: '下一步建议',
        content: valueOrPending(contextData.nextPlan),
      },
      {
        id: 'optimize-direction',
        title: '可继续优化方向',
        content: `面向“${valueOrPending(contextData.reportAudience)}”继续优化，并可扩展为领导汇报版、团队同步版或 PPT 大纲版。`,
      },
    ],
  };
}

function buildAiOutput(task, contextData = {}, sessionOutput = null) {
  if (sessionOutput?.sections?.length) {
    return {
      generatedAt: Date.now(),
      summary: sessionOutput.summary,
      sections: sessionOutput.sections,
    };
  }

  return {
    generatedAt: Date.now(),
    summary: `${task.name} 已根据当前上下文生成默认初稿。`,
    sections: [
      { id: 'data-summary', title: '数据摘要', content: valueOrPending(contextData.dataResults) },
      {
        id: 'result-interpretation',
        title: '结果解读',
        content: `当前任务目标是“${valueOrPending(contextData.taskGoal)}”，输出会优先围绕目标、结果和后续动作展开。`,
      },
      { id: 'issue-review', title: '问题识别', content: valueOrPending(contextData.issues) },
      { id: 'next-actions', title: '下一步建议', content: valueOrPending(contextData.nextPlan) },
      {
        id: 'optimize-direction',
        title: '可继续优化方向',
        content: '可继续生成领导汇报版、团队同步版、PPT 大纲版和邮件通知版。',
      },
    ],
  };
}

function aiOutputHasIssueReview(aiOutput) {
  const issueSection = aiOutput?.sections?.find((section) => section.id === 'issue-review');
  return Boolean(issueSection?.content && issueSection.content !== '待补充');
}

function buildOutputCheck(contextData = {}, aiOutput = null) {
  const dataLength = getTextLength(contextData.dataResults);
  const hasAudience = getTextLength(contextData.reportAudience) > 0;
  const hasNextPlan = getTextLength(contextData.nextPlan) > 0;
  const hasContext =
    getTextLength(contextData.projectBackground) + getTextLength(contextData.executionActions) >= 20;

  return [
    {
      label: '具体度',
      status: hasContext ? '充分' : '需补充',
      note: hasContext
        ? '背景和执行动作已经能支撑结构化输出。'
        : '建议补充更多背景、执行动作和任务边界。',
    },
    {
      label: '数据支撑',
      status: dataLength === 0 ? '存在风险' : dataLength < 12 ? '需补充' : '充分',
      note:
        dataLength === 0
          ? '当前缺少数据结果，结论可信度会受到影响。'
          : dataLength < 12
            ? '已有数据线索，但还需要补充数量、周期或对比信息。'
            : '当前数据结果可以支撑基础结论。',
    },
    {
      label: '数据处理清晰度',
      status: dataLength >= 12 ? '充分' : '需补充',
      note: dataLength >= 12 ? '数据表达较清晰，可进入下一步版本化。' : '建议说明数据来源、口径或处理方式。',
    },
    {
      label: '对象匹配',
      status: hasAudience ? '充分' : '需补充',
      note: hasAudience ? `已明确面向“${contextData.reportAudience}”。` : '需要明确结果最终给谁看。',
    },
    {
      label: '逻辑完整',
      status: aiOutputHasIssueReview(aiOutput) ? '充分' : '需补充',
      note: aiOutputHasIssueReview(aiOutput)
        ? '输出已经包含问题识别或原因分析。'
        : '建议补充问题识别，避免只有结论没有解释。',
    },
    {
      label: '下一步计划',
      status: hasNextPlan ? '充分' : '存在风险',
      note: hasNextPlan ? '后续动作已经具备承接性。' : '缺少下一步计划会影响可执行性。',
    },
    {
      label: '可提交度',
      status: dataLength >= 12 && hasAudience && hasNextPlan ? '充分' : '需补充',
      note:
        dataLength >= 12 && hasAudience && hasNextPlan
          ? '当前结果具备较好的提交基础。'
          : '建议补齐数据、对象和下一步计划后再提交。',
    },
  ];
}

function buildGeneratedVersion(task, workflowState, versionId, versionCatalog) {
  const version = versionCatalog.find((item) => item.id === versionId);

  if (!version) {
    return null;
  }

  const meta = versionMeta[versionId] ?? {};
  const projectName = valueOrPending(workflowState.contextData.projectName || task.name);
  const baseSummary =
    workflowState.aiOutput?.summary ||
    workflowState.sessionOutput?.summary ||
    `${task.name} 已形成一版可继续优化的初稿。`;

  return {
    id: version.id,
    name: version.name,
    scene: version.scene,
    summary: meta.summary ?? version.scene,
    suggestions: meta.suggestions ?? [],
    preview: `“${projectName}”${version.name}：${baseSummary}`,
  };
}

function buildUsedSkills(generatedVersions = []) {
  const versionNames = generatedVersions.map((item) => item.name).filter(Boolean);

  return [
    {
      name: 'Context Expression',
      record: '使用了 Context Expression：补充了目标、对象、数据结果和限制条件',
    },
    {
      name: 'Prompt Structure',
      record: '使用了 Prompt Structure：生成了结构化 Prompt',
    },
    {
      name: 'AI Work Session',
      record: '使用了 AI Work Session：通过对话补充了输出要求',
    },
    {
      name: 'Output Check',
      record: '使用了 Output Check：检查了数据支撑和可提交度',
    },
    {
      name: 'Version Optimization',
      record: versionNames.length
        ? `使用了 Version Optimization：生成了${versionNames.join('和')}`
        : '使用了 Version Optimization：准备生成不同沟通场景下的版本',
    },
  ];
}

function WorkflowExecute({
  task,
  session,
  activeTemplate,
  onSessionChange,
  onSaveWorkflow,
  onCreateTemplate,
  onShowSaveSuccess,
  onNavigate,
}) {
  const versionCatalog = useMemo(() => getVersionCatalog(), []);
  const [saveMessage, setSaveMessage] = useState('');
  const activeStep = normalizeStepId(session.currentStepId);

  const workflowState = useMemo(() => {
    const contextData = session.contextData ?? session.contextValues ?? {};
    const generatedVersions = Array.isArray(session.generatedVersions)
      ? session.generatedVersions
      : [];

    return {
      taskId: session.taskId ?? task.id,
      taskName: session.taskName ?? task.name,
      contextData,
      promptData: session.promptData ?? buildPromptData(task, contextData),
      sessionMessages:
        session.sessionMessages ?? session.aiSessionMessages ?? createInitialSessionMessages(),
      sessionOutput: session.sessionOutput ?? session.aiSessionOutput ?? null,
      aiOutput: session.aiOutput ?? null,
      outputCheck: Array.isArray(session.outputCheck) ? session.outputCheck : [],
      generatedVersions,
      savedResult: session.savedResult ?? null,
      usedSkills:
        Array.isArray(session.usedSkills) && session.usedSkills.length
          ? session.usedSkills
          : buildUsedSkills(generatedVersions),
    };
  }, [session, task]);

  const [selectedVersionId, setSelectedVersionId] = useState(
    workflowState.generatedVersions[0]?.id ?? '',
  );

  useEffect(() => {
    if (!workflowState.generatedVersions.length) {
      setSelectedVersionId('');
      return;
    }

    if (!workflowState.generatedVersions.some((item) => item.id === selectedVersionId)) {
      setSelectedVersionId(workflowState.generatedVersions[0].id);
    }
  }, [selectedVersionId, workflowState.generatedVersions]);

  const selectedVersion = useMemo(() => {
    if (!workflowState.generatedVersions.length) {
      return null;
    }

    return (
      workflowState.generatedVersions.find((item) => item.id === selectedVersionId) ??
      workflowState.generatedVersions[0]
    );
  }, [selectedVersionId, workflowState.generatedVersions]);

  const currentStepIndex = workflowStepItems.findIndex((step) => step.id === activeStep);
  const effectiveOutputCheck = workflowState.outputCheck.length
    ? workflowState.outputCheck
    : buildOutputCheck(workflowState.contextData, workflowState.aiOutput);

  const updateSession = (updater) => {
    setSaveMessage('');
    onSessionChange((prevSession) => {
      const nextPatch = typeof updater === 'function' ? updater(prevSession) : updater;

      return {
        ...prevSession,
        ...nextPatch,
        isSaved: false,
        savedAtLabel: '',
      };
    });
  };

  const handleFieldChange = (fieldKey, value) => {
    updateSession((prevSession) => {
      const nextContext = {
        ...(prevSession.contextData ?? prevSession.contextValues ?? {}),
        [fieldKey]: value,
      };

      return {
        contextData: nextContext,
        contextValues: nextContext,
      };
    });
  };

  const handleStepChange = (stepId) => {
    updateSession({ currentStepId: normalizeStepId(stepId) });
  };

  const handleGeneratePrompt = () => {
    const nextPromptData = buildPromptData(task, workflowState.contextData);

    updateSession({
      currentStepId: 'prompt',
      promptData: nextPromptData,
      usedSkills: buildUsedSkills(workflowState.generatedVersions),
    });
  };

  const handleEnterSession = () => {
    updateSession((prevSession) => ({
      currentStepId: 'session',
      promptData: prevSession.promptData ?? buildPromptData(task, workflowState.contextData),
      sessionMessages:
        prevSession.sessionMessages ?? prevSession.aiSessionMessages ?? createInitialSessionMessages(),
      aiSessionMessages:
        prevSession.sessionMessages ?? prevSession.aiSessionMessages ?? createInitialSessionMessages(),
    }));
  };

  const appendSessionExchange = (instruction) => {
    const timestamp = Date.now();
    const userMessage = {
      id: `user-${timestamp}`,
      role: 'user',
      content: instruction,
    };
    const aiMessage = {
      id: `ai-${timestamp}`,
      role: 'ai',
      content: createMockAiReply(instruction),
    };
    const nextOutput = buildSessionOutput(task, workflowState.contextData, instruction);

    updateSession((prevSession) => {
      const previousMessages =
        prevSession.sessionMessages ?? prevSession.aiSessionMessages ?? createInitialSessionMessages();
      const nextMessages = [...previousMessages, userMessage, aiMessage];

      return {
        currentStepId: 'session',
        sessionMessages: nextMessages,
        aiSessionMessages: nextMessages,
        sessionOutput: nextOutput,
        aiSessionOutput: nextOutput,
        usedSkills: buildUsedSkills(prevSession.generatedVersions ?? []),
      };
    });
  };

  const handleSendSessionMessage = (message) => {
    appendSessionExchange(message);
  };

  const handleQuickAction = (actionKey, actionLabel) => {
    appendSessionExchange(quickActionPrompts[actionKey] ?? actionLabel);
  };

  const handleGoToOutput = () => {
    const nextSessionOutput =
      workflowState.sessionOutput ?? buildSessionOutput(task, workflowState.contextData);
    const nextAiOutput = buildAiOutput(task, workflowState.contextData, nextSessionOutput);

    updateSession({
      currentStepId: 'output',
      sessionOutput: nextSessionOutput,
      aiSessionOutput: nextSessionOutput,
      aiOutput: nextAiOutput,
    });
  };

  const handleGoToCheck = () => {
    const nextAiOutput =
      workflowState.aiOutput ??
      buildAiOutput(task, workflowState.contextData, workflowState.sessionOutput);
    const nextOutputCheck = buildOutputCheck(workflowState.contextData, nextAiOutput);

    updateSession({
      currentStepId: 'check',
      aiOutput: nextAiOutput,
      outputCheck: nextOutputCheck,
      usedSkills: buildUsedSkills(workflowState.generatedVersions),
    });
  };

  const handleGoToVersion = () => {
    updateSession({
      currentStepId: 'version',
      outputCheck: effectiveOutputCheck,
    });
  };

  const handleGenerateVersion = (versionId) => {
    setSelectedVersionId(versionId);

    updateSession((prevSession) => {
      const previousVersions = Array.isArray(prevSession.generatedVersions)
        ? prevSession.generatedVersions
        : [];
      const nextWorkflowState = {
        ...workflowState,
        generatedVersions: previousVersions,
        aiOutput:
          prevSession.aiOutput ??
          buildAiOutput(
            task,
            prevSession.contextData ?? prevSession.contextValues ?? {},
            prevSession.sessionOutput ?? prevSession.aiSessionOutput ?? null,
          ),
      };
      const generatedVersion = buildGeneratedVersion(
        task,
        nextWorkflowState,
        versionId,
        versionCatalog,
      );

      if (!generatedVersion) {
        return {};
      }

      const nextVersions = previousVersions.some((item) => item.id === versionId)
        ? previousVersions.map((item) => (item.id === versionId ? generatedVersion : item))
        : [...previousVersions, generatedVersion];

      return {
        generatedVersions: nextVersions,
        usedSkills: buildUsedSkills(nextVersions),
      };
    });
  };

  const handleGoToSave = () => {
    updateSession({
      currentStepId: 'save',
      outputCheck: effectiveOutputCheck,
      usedSkills: buildUsedSkills(workflowState.generatedVersions),
    });
  };

  const handleSaveAll = () => {
    const completeState = {
      ...workflowState,
      outputCheck: effectiveOutputCheck,
      usedSkills: buildUsedSkills(workflowState.generatedVersions),
    };
    const bundle = onSaveWorkflow?.(completeState);

    if (!bundle) {
      return;
    }

    setSaveMessage(`已在 ${bundle.savedAtLabel} 保存到 Results Library、My Workflows 和 Skill Records。`);
    onShowSaveSuccess?.(bundle);
  };

  const handleCreateTemplate = (mode) => {
    const result = onCreateTemplate?.(mode);

    if (!result) {
      return;
    }

    setSaveMessage(
      result.mode === 'updated'
        ? `已更新当前模板：${result.template.title}。`
        : `已沉淀为新模板：${result.template.title}。`,
    );
  };

  const sidebarContent = useMemo(() => {
    switch (activeStep) {
      case 'context':
        return {
          title: 'Context Expression',
          blocks: [
            { heading: '当前 Skill', items: ['Context Expression'] },
            { heading: '建议补充', items: ['数据结果', '汇报对象', '限制条件'] },
          ],
        };
      case 'prompt':
        return {
          title: 'Prompt Structure',
          blocks: [
            { heading: '当前 Skill', items: ['Prompt Structure'] },
            { heading: '提示', items: ['Prompt 应包含角色、任务、背景、输出格式和评价标准。'] },
          ],
        };
      case 'session':
        return {
          title: 'AI Work Session',
          blocks: [
            { heading: '当前模式', items: ['任务内 AI 协作工作区，不是普通聊天页。'] },
            { heading: '建议动作', items: ['先生成汇报初稿', '再检查数据支撑', '必要时改成领导汇报或 PPT 结构'] },
          ],
        };
      case 'output':
        return {
          title: '下一步建议',
          blocks: [{ heading: '操作建议', items: ['进入 Output Check，不要直接复制结果。'] }],
        };
      case 'check':
        return {
          title: 'Output Check',
          blocks: [
            { heading: '当前 Skill', items: ['Output Check'] },
            { heading: '常见问题', items: ['数据支撑不足', '结论模糊', '下一步不明确'] },
          ],
        };
      case 'version':
        return {
          title: selectedVersion ? '当前版本预览' : 'Version Optimization',
          blocks: selectedVersion
            ? [
                { heading: `版本名称：${selectedVersion.name}`, items: [] },
                { heading: `适用场景：${selectedVersion.scene}`, items: [] },
                { heading: '内容摘要', items: [selectedVersion.summary, selectedVersion.preview] },
                { heading: '建议', items: selectedVersion.suggestions ?? [] },
              ]
            : [
                {
                  heading: '优化方向',
                  items: ['面向领导的汇报版', '面向团队的同步版', '面向展示的 PPT 大纲版'],
                },
              ],
        };
      case 'save':
        return {
          title: 'Save Result',
          blocks: [
            {
              heading: '保存建议',
              items: [
                '保存前建议检查版本名称',
                '结果保存后可在 Results Library 中复用',
                '方法记录会同步进入 Skill Records',
              ],
            },
          ],
        };
      default:
        return {
          title: 'Step Notice',
          blocks: [{ heading: '当前步骤', items: ['当前步骤暂未配置，请返回上一步。'] }],
        };
    }
  }, [activeStep, selectedVersion]);

  const renderMainPanel = () => {
    switch (activeStep) {
      case 'context':
        return (
          <ContextBuilder
            task={task}
            contextData={workflowState.contextData}
            fields={contextFields}
            onFieldChange={handleFieldChange}
            onGeneratePrompt={handleGeneratePrompt}
          />
        );
      case 'prompt':
        return (
          <PromptPreview
            task={task}
            promptData={workflowState.promptData}
            onEnterSession={handleEnterSession}
          />
        );
      case 'session':
        return (
          <AIWorkSession
            taskName={task.name}
            contextData={workflowState.contextData}
            promptData={workflowState.promptData}
            messages={workflowState.sessionMessages}
            sessionOutput={workflowState.sessionOutput}
            onSendMessage={handleSendSessionMessage}
            onQuickAction={handleQuickAction}
            onGoToOutput={handleGoToOutput}
          />
        );
      case 'output':
        return (
          <AIOutput
            taskName={task.name}
            aiOutput={workflowState.aiOutput}
            onGoToCheck={handleGoToCheck}
          />
        );
      case 'check':
        return <OutputCheck checkItems={effectiveOutputCheck} onGoToVersion={handleGoToVersion} />;
      case 'version':
        return (
          <VersionCards
            versions={versionCatalog}
            generatedVersions={workflowState.generatedVersions}
            selectedVersionId={selectedVersion?.id ?? ''}
            onGenerateVersion={handleGenerateVersion}
            onSelectVersion={setSelectedVersionId}
            onGoToSave={handleGoToSave}
          />
        );
      case 'save':
        return (
          <SaveResult
            workflowState={{
              ...workflowState,
              outputCheck: effectiveOutputCheck,
              usedSkills: buildUsedSkills(workflowState.generatedVersions),
            }}
            outputChecks={effectiveOutputCheck}
            generatedVersions={workflowState.generatedVersions}
            saveMessage={saveMessage}
            activeTemplate={activeTemplate}
            onSaveAll={handleSaveAll}
            onCreateTemplate={handleCreateTemplate}
            onNavigate={onNavigate}
          />
        );
      default:
        return (
          <EmptyState
            compact
            title="当前步骤暂未配置"
            description="请返回上一步，或重新选择工作流步骤。"
          />
        );
    }
  };

  return (
    <section className="workflow-execute-page">
      <div className="workflow-execute-page__notice">
        <span className="workflow-execute-page__notice-label">当前来源</span>
        <div className="workflow-execute-page__notice-copy">
          <p className="workflow-execute-page__notice-text">{session.sourceLabel}</p>
          <p className="workflow-execute-page__notice-subtext">
            你现在看到的是已回填的上下文和步骤位置，可以直接继续编辑；保存后的内容也会保留在当前浏览器中。
          </p>
        </div>
      </div>

      {activeTemplate ? (
        <div className="workflow-execute-page__template-notice">
          <span className="workflow-execute-page__template-notice-badge">模板回填</span>
          <p className="workflow-execute-page__template-notice-text">
            当前会话来自“{activeTemplate.title}”，来源于 {activeTemplate.sourceLabel}。你可以继续修改并覆盖更新，也可以另存为新的模板入口。
          </p>
        </div>
      ) : null}

      <div className="workflow-execute-layout">
        <aside className="workflow-execute-layout__sidebar">
          <div className="execute-sidebar-card">
            <div className="execute-sidebar-card__header">
              <span className="execute-sidebar-card__eyebrow">{task.name}</span>
              <h2 className="execute-sidebar-card__title">工作流步骤</h2>
            </div>
            <WorkflowSteps
              steps={workflowStepItems}
              currentStepId={activeStep}
              onStepChange={handleStepChange}
              completedStepIndex={currentStepIndex - 1}
              variant="navigation"
            />
          </div>
        </aside>

        <div className="workflow-execute-layout__main">{renderMainPanel()}</div>

        <aside className="workflow-execute-layout__assist">
          <div className="execute-assist-card">
            <h3 className="execute-assist-card__title">{sidebarContent.title}</h3>
            <div className="execute-assist-card__content">
              {sidebarContent.blocks.map((block) => (
                <section key={block.heading} className="execute-assist-card__section">
                  <h4 className="execute-assist-card__heading">{block.heading}</h4>
                  {block.items.length > 0 ? (
                    <ul className="execute-assist-card__list">
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}

              {activeStep === 'version' && selectedVersion ? (
                <div className="execute-assist-card__actions">
                  <button type="button" className="button button--ghost">
                    继续优化
                  </button>
                  <button type="button" className="button button--primary" onClick={handleGoToSave}>
                    进入 Save Result
                  </button>
                </div>
              ) : null}

              {activeStep === 'session' && workflowState.sessionOutput ? (
                <div className="execute-assist-card__actions">
                  <button type="button" className="button button--primary" onClick={handleGoToOutput}>
                    进入 AI Output
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

export default WorkflowExecute;
