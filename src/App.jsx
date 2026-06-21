import React, { useEffect, useMemo, useState } from 'react';
import PageShell from './components/layout/PageShell';
import Workbench from './pages/Workbench';
import WorkflowExecute from './pages/WorkflowExecute';
import TaskLibrary from './pages/TaskLibrary';
import TaskDetail from './pages/TaskDetail';
import MyWorkflows from './pages/MyWorkflows';
import ResultsLibrary from './pages/ResultsLibrary';
import ResultDetail from './pages/ResultDetail';
import WorkflowDetail from './pages/WorkflowDetail';
import SaveSuccess from './pages/SaveSuccess';
import SkillRecords from './pages/SkillRecords';
import Membership from './pages/Membership';
import tasks from './data/tasks';
import { buildSaveArtifacts, createWorkflowSession } from './data/workflows';
import { skillArchiveSections } from './data/methodNotes';
import {
  createDefaultAppState,
  loadAppState,
  persistAppState,
} from './data/localState';
import {
  appendTemplateHistory,
  buildTemplateFromResult,
  buildTemplateFromSession,
  buildTemplateFromSkillRecord,
  importTemplatePayload,
  markTemplateUsed,
  restoreTemplateFromHistory,
  sortTemplates,
} from './data/templateEntries';

const pageDefinitions = {
  workbench: {
    key: 'workbench',
    title: 'Workbench',
    description: '选择一个高频任务，进入对应 AI 工作流。',
  },
  'task-library': {
    key: 'task-library',
    title: 'Task Library',
    description: '从真实工作场景中选择任务，并查看可直接复用的模板入口。',
  },
  'task-detail': {
    key: 'task-library',
    title: 'Task Detail',
    description: '查看任务说明、适用场景、输入要求和推荐 Skill。',
  },
  'my-workflows': {
    key: 'my-workflows',
    title: 'My Workflows',
    description: '查看正在推进、已保存和可继续优化的 AI 工作流。',
  },
  'workflow-detail': {
    key: 'my-workflows',
    title: 'Workflow Detail',
    description: '查看这条工作流当前停在哪一步、保留了哪些上下文，以及如何继续编辑。',
  },
  'results-library': {
    key: 'results-library',
    title: 'Results Library',
    description: '沉淀已完成的报告、方案、纪要和多版本输出。',
  },
  'result-detail': {
    key: 'results-library',
    title: 'Result Detail',
    description: '查看当前结果的来源、版本输出、质检结论和后续复用入口。',
  },
  'save-success': {
    key: 'results-library',
    title: 'Save Complete',
    description: '本次任务已经完成保存，可以继续查看结果详情，或回到工作台开始下一项任务。',
  },
  'skill-records': {
    key: 'skill-records',
    title: 'Skill Records',
    description: '记录真实任务里用过的方法，而不是等级或积分。',
  },
  membership: {
    key: 'membership',
    title: 'Membership',
    description: '查看不同方案在工作流额度、版本输出和结果沉淀上的差异。',
  },
};

function App() {
  const initialState = useMemo(() => loadAppState(tasks), []);
  const initialView = ['result-detail', 'workflow-detail', 'save-success'].includes(
    initialState.currentView,
  )
    ? 'workbench'
    : initialState.currentView;

  const [currentView, setCurrentView] = useState(initialView);
  const [activeTaskId, setActiveTaskId] = useState(initialState.activeTaskId);
  const [workflowSession, setWorkflowSession] = useState(initialState.workflowSession);
  const [savedWorkflows, setSavedWorkflows] = useState(initialState.savedWorkflows);
  const [savedResults, setSavedResults] = useState(initialState.savedResults);
  const [skillRecords, setSkillRecords] = useState(initialState.skillRecords);
  const [taskEntryTemplates, setTaskEntryTemplates] = useState(
    initialState.taskEntryTemplates,
  );
  const [activeResultId, setActiveResultId] = useState('');
  const [activeWorkflowRecordId, setActiveWorkflowRecordId] = useState('');
  const [latestSaveBundle, setLatestSaveBundle] = useState(null);

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) ?? tasks[0],
    [activeTaskId],
  );

  const activeTemplate = useMemo(
    () =>
      workflowSession?.linkedTemplateId
        ? taskEntryTemplates.find((item) => item.id === workflowSession.linkedTemplateId) ?? null
        : null,
    [taskEntryTemplates, workflowSession?.linkedTemplateId],
  );

  const activeResult = useMemo(
    () => savedResults.find((item) => item.id === activeResultId) ?? null,
    [activeResultId, savedResults],
  );

  const activeWorkflowRecord = useMemo(
    () => savedWorkflows.find((item) => item.id === activeWorkflowRecordId) ?? null,
    [activeWorkflowRecordId, savedWorkflows],
  );

  const currentPage =
    currentView === 'workflow-execute'
      ? {
          key: 'workbench',
          title: `${activeTask.name} 工作流`,
          description: '按照步骤完成上下文构建、Prompt 预览、输出质检与版本优化。',
        }
      : currentView === 'task-detail'
        ? {
            key: 'task-library',
            title: activeTask.name,
            description: '查看适用场景、输入要求和流程结构，再进入执行页。',
          }
        : currentView === 'result-detail'
          ? {
              key: 'results-library',
              title: activeResult?.title || 'Result Detail',
              description: '查看结果详情、版本输出和后续复用方式。',
            }
          : currentView === 'workflow-detail'
            ? {
                key: 'my-workflows',
                title: activeWorkflowRecord?.taskName || 'Workflow Detail',
                description: '查看工作流详情、停留步骤和继续编辑入口。',
              }
            : pageDefinitions[currentView];

  useEffect(() => {
    persistAppState({
      currentView,
      activeTaskId,
      workflowSession,
      savedWorkflows,
      savedResults,
      skillRecords,
      taskEntryTemplates,
    });
  }, [
    activeTaskId,
    currentView,
    savedResults,
    savedWorkflows,
    skillRecords,
    taskEntryTemplates,
    workflowSession,
  ]);

  const handleNavigate = (nextPage) => {
    setCurrentView(nextPage);
  };

  const openWorkflowWithSession = (taskId, sessionOverrides = {}) => {
    const nextTask = tasks.find((task) => task.id === taskId) ?? tasks[0];

    setActiveTaskId(nextTask.id);
    setWorkflowSession(createWorkflowSession(nextTask, sessionOverrides));
    setCurrentView('workflow-execute');
    setLatestSaveBundle(null);
  };

  const handleOpenResultDetail = (resultId) => {
    setActiveResultId(resultId);
    setCurrentView('result-detail');
  };

  const handleOpenWorkflowDetail = (workflowId) => {
    setActiveWorkflowRecordId(workflowId);
    setCurrentView('workflow-detail');
  };

  const upsertTemplate = (nextTemplate) => {
    setTaskEntryTemplates((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== nextTemplate.id);
      return sortTemplates([nextTemplate, ...filtered]);
    });
  };

  const updateTemplateById = (templateId, updater) => {
    setTaskEntryTemplates((prevItems) =>
      sortTemplates(prevItems.map((item) => (item.id === templateId ? updater(item) : item))),
    );
  };

  const handleOpenWorkflow = (taskId) => {
    openWorkflowWithSession(taskId, {
      sourceType: 'task-entry',
      sourceLabel: '高频任务入口',
    });
  };

  const handleOpenTaskDetail = (taskId) => {
    setActiveTaskId(taskId);
    setCurrentView('task-detail');
  };

  const handleOpenTemplateWorkflow = (templateEntry) => {
    const nextTemplate = markTemplateUsed(templateEntry);

    setTaskEntryTemplates((prevItems) =>
      sortTemplates(prevItems.map((item) => (item.id === templateEntry.id ? nextTemplate : item))),
    );

    openWorkflowWithSession(templateEntry.taskId, {
      contextValues: templateEntry.contextValues,
      generatedVersions: templateEntry.generatedVersions,
      currentStepId: 'context-builder',
      sourceType: 'skill-template',
      sourceLabel: `${templateEntry.title} · 模板入口`,
      linkedTemplateId: templateEntry.id,
      linkedSkillRecordId: templateEntry.linkedSkillRecordId,
      linkedResultId: templateEntry.linkedResultId,
      linkedWorkflowId: templateEntry.linkedWorkflowId,
    });
  };

  const handleResumeWorkflow = (workflowEntry) => {
    openWorkflowWithSession(workflowEntry.taskId, {
      contextValues: workflowEntry.contextValues,
      generatedVersions: workflowEntry.generatedVersions,
      currentStepId: workflowEntry.currentStepId,
      savedAtLabel: workflowEntry.savedAtLabel,
      isSaved: true,
      sourceType: 'workflow-library',
      sourceLabel: `从 My Workflows 恢复 · ${workflowEntry.currentStepLabel}`,
      linkedWorkflowId: workflowEntry.id,
      linkedResultId: workflowEntry.linkedResultId,
      linkedSkillRecordId: workflowEntry.linkedSkillRecordId,
    });
  };

  const handleContinueFromResult = (resultEntry) => {
    openWorkflowWithSession(resultEntry.taskId, {
      contextValues: resultEntry.contextValues,
      generatedVersions: resultEntry.generatedVersions,
      currentStepId: 'version-optimization',
      savedAtLabel: resultEntry.savedAtLabel,
      isSaved: true,
      sourceType: 'result-library',
      sourceLabel: `从 Results Library 恢复 · ${resultEntry.title}`,
      linkedWorkflowId: resultEntry.linkedWorkflowId,
      linkedResultId: resultEntry.id,
      linkedSkillRecordId: resultEntry.linkedSkillRecordId,
    });
  };

  const handleCreateTemplateFromSkill = (record) => {
    const previousTemplate = taskEntryTemplates.find((item) => item.id === `${record.id}-template`);
    const nextTemplate = buildTemplateFromSkillRecord(record, previousTemplate);

    upsertTemplate(nextTemplate);
    setCurrentView('workbench');
  };

  const handleCreateTemplateFromResult = (result) => {
    const previousTemplate = taskEntryTemplates.find((item) => item.id === `${result.id}-template`);
    const nextTemplate = buildTemplateFromResult(result, previousTemplate);

    upsertTemplate(nextTemplate);
    setCurrentView('task-library');
  };

  const handleCreateTemplateFromSession = (mode = 'auto') => {
    const previousTemplate =
      mode !== 'new' && workflowSession.linkedTemplateId
        ? taskEntryTemplates.find((item) => item.id === workflowSession.linkedTemplateId) ?? null
        : null;
    const nextTemplate = buildTemplateFromSession(
      activeTask,
      {
        ...workflowSession,
        linkedTemplateId: mode === 'new' ? '' : workflowSession.linkedTemplateId,
      },
      previousTemplate,
    );

    upsertTemplate(nextTemplate);
    setWorkflowSession((prevSession) => ({
      ...prevSession,
      linkedTemplateId: mode === 'new' ? prevSession.linkedTemplateId : nextTemplate.id,
    }));

    return {
      template: nextTemplate,
      mode: previousTemplate && mode !== 'new' ? 'updated' : 'created',
    };
  };

  const handleDeleteTemplate = (templateId) => {
    setTaskEntryTemplates((prevItems) => prevItems.filter((item) => item.id !== templateId));
    setWorkflowSession((prevSession) =>
      prevSession.linkedTemplateId === templateId
        ? { ...prevSession, linkedTemplateId: '' }
        : prevSession,
    );
  };

  const handleRenameTemplate = (templateId, title) => {
    const nextTitle = title.trim();

    if (!nextTitle) {
      return;
    }

    updateTemplateById(templateId, (item) =>
      appendTemplateHistory(
        {
          ...item,
          title: nextTitle,
        },
        '重命名模板',
      ),
    );
  };

  const handleToggleTemplatePinned = (templateId) => {
    updateTemplateById(templateId, (item) =>
      appendTemplateHistory(
        {
          ...item,
          isPinned: !item.isPinned,
        },
        item.isPinned ? '取消置顶模板' : '置顶模板',
      ),
    );
  };

  const handleUpdateTemplateTags = (templateId, tags) => {
    const nextTags = Array.from(new Set(tags.map((item) => item.trim()).filter(Boolean)));

    updateTemplateById(templateId, (item) =>
      appendTemplateHistory(
        {
          ...item,
          tags: nextTags,
        },
        '更新模板标签',
      ),
    );
  };

  const handleRollbackTemplate = (templateId, historyId) => {
    updateTemplateById(templateId, (item) => {
      const historyEntry = item.versionHistory?.find((history) => history.id === historyId);

      if (!historyEntry) {
        return item;
      }

      return restoreTemplateFromHistory(item, historyEntry);
    });
  };

  const handleImportTemplate = (payload) => {
    const nextTemplate = importTemplatePayload(payload);
    upsertTemplate(nextTemplate);
  };

  const handleBatchDeleteTemplates = (templateIds) => {
    if (!templateIds.length) {
      return;
    }

    setTaskEntryTemplates((prevItems) =>
      prevItems.filter((item) => !templateIds.includes(item.id)),
    );
    setWorkflowSession((prevSession) =>
      templateIds.includes(prevSession.linkedTemplateId)
        ? { ...prevSession, linkedTemplateId: '' }
        : prevSession,
    );
  };

  const handleBatchPinTemplates = (templateIds) => {
    if (!templateIds.length) {
      return;
    }

    setTaskEntryTemplates((prevItems) =>
      sortTemplates(
        prevItems.map((item) =>
          templateIds.includes(item.id)
            ? appendTemplateHistory(
                {
                  ...item,
                  isPinned: !item.isPinned,
                },
                item.isPinned ? '批量取消置顶模板' : '批量置顶模板',
              )
            : item,
        ),
      ),
    );
  };

  const handleResetLocalData = () => {
    const defaults = createDefaultAppState(tasks);

    setCurrentView(defaults.currentView);
    setActiveTaskId(defaults.activeTaskId);
    setWorkflowSession(defaults.workflowSession);
    setSavedWorkflows(defaults.savedWorkflows);
    setSavedResults(defaults.savedResults);
    setSkillRecords(defaults.skillRecords);
    setTaskEntryTemplates(defaults.taskEntryTemplates);
    setActiveResultId('');
    setActiveWorkflowRecordId('');
    setLatestSaveBundle(null);
  };

  const handleWorkflowSessionChange = (updater) => {
    setWorkflowSession((prevSession) =>
      (typeof updater === 'function' ? updater(prevSession) : updater),
    );
  };

  const handleSaveWorkflow = () => {
    const bundle = buildSaveArtifacts(activeTask, workflowSession);

    setSavedResults((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== bundle.resultEntry.id);
      return [bundle.resultEntry, ...filtered];
    });
    setSavedWorkflows((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== bundle.workflowEntry.id);
      return [bundle.workflowEntry, ...filtered];
    });
    setSkillRecords((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== bundle.skillRecordEntry.id);
      return [bundle.skillRecordEntry, ...filtered];
    });
    setWorkflowSession((prevSession) => ({
      ...prevSession,
      isSaved: true,
      savedAtLabel: bundle.savedAtLabel,
      linkedWorkflowId: bundle.workflowEntry.id,
      linkedResultId: bundle.resultEntry.id,
      linkedSkillRecordId: bundle.skillRecordEntry.id,
    }));

    return bundle;
  };

  const handleShowSaveSuccess = (bundle) => {
    setLatestSaveBundle(bundle);
    setActiveResultId(bundle.resultEntry.id);
    setActiveWorkflowRecordId(bundle.workflowEntry.id);
    setCurrentView('save-success');
  };

  const handleOpenLinkedResultFromWorkflow = (workflow) => {
    if (workflow?.linkedResultId) {
      handleOpenResultDetail(workflow.linkedResultId);
      return;
    }

    setCurrentView('results-library');
  };

  return (
    <PageShell
      currentPage={currentPage}
      onNavigate={handleNavigate}
      onPrimaryAction={() => handleNavigate('workbench')}
    >
      {currentView === 'workflow-execute' && (
        <WorkflowExecute
          task={activeTask}
          session={workflowSession}
          activeTemplate={activeTemplate}
          onSessionChange={handleWorkflowSessionChange}
          onSaveWorkflow={handleSaveWorkflow}
          onCreateTemplate={handleCreateTemplateFromSession}
          onShowSaveSuccess={handleShowSaveSuccess}
          onNavigate={handleNavigate}
        />
      )}

      {currentView === 'workbench' && (
        <Workbench
          onEnterWorkflow={handleOpenWorkflow}
          templates={taskEntryTemplates}
          onOpenTemplate={handleOpenTemplateWorkflow}
          onManageTemplates={() => handleNavigate('task-library')}
        />
      )}

      {currentView === 'task-library' && (
        <TaskLibrary
          tasks={tasks}
          templates={taskEntryTemplates}
          onOpenWorkflow={handleOpenWorkflow}
          onOpenTaskDetail={handleOpenTaskDetail}
          onOpenTemplate={handleOpenTemplateWorkflow}
          onDeleteTemplate={handleDeleteTemplate}
          onRenameTemplate={handleRenameTemplate}
          onToggleTemplatePinned={handleToggleTemplatePinned}
          onUpdateTemplateTags={handleUpdateTemplateTags}
          onRollbackTemplate={handleRollbackTemplate}
          onImportTemplate={handleImportTemplate}
          onBatchDeleteTemplates={handleBatchDeleteTemplates}
          onBatchPinTemplates={handleBatchPinTemplates}
          onResetLocalData={handleResetLocalData}
        />
      )}

      {currentView === 'task-detail' && (
        <TaskDetail
          task={activeTask}
          onBack={() => handleNavigate('task-library')}
          onOpenWorkflow={handleOpenWorkflow}
        />
      )}

      {currentView === 'my-workflows' && (
        <MyWorkflows
          workflows={savedWorkflows}
          onOpenWorkflow={handleResumeWorkflow}
          onOpenWorkflowDetail={handleOpenWorkflowDetail}
        />
      )}

      {currentView === 'workflow-detail' && (
        <WorkflowDetail
          workflow={activeWorkflowRecord}
          onBack={() => handleNavigate('my-workflows')}
          onResumeWorkflow={handleResumeWorkflow}
          onOpenLinkedResult={handleOpenLinkedResultFromWorkflow}
        />
      )}

      {currentView === 'results-library' && (
        <ResultsLibrary
          results={savedResults}
          onContinueResult={handleContinueFromResult}
          onCreateTemplate={handleCreateTemplateFromResult}
          onOpenResultDetail={handleOpenResultDetail}
        />
      )}

      {currentView === 'result-detail' && (
        <ResultDetail
          result={activeResult}
          onBack={() => handleNavigate('results-library')}
          onContinueResult={handleContinueFromResult}
          onCreateTemplate={handleCreateTemplateFromResult}
        />
      )}

      {currentView === 'save-success' && (
        <SaveSuccess
          task={activeTask}
          bundle={latestSaveBundle}
          onOpenResults={() => handleOpenResultDetail(activeResultId)}
          onOpenWorkflows={() => handleOpenWorkflowDetail(activeWorkflowRecordId)}
          onOpenSkills={() => handleNavigate('skill-records')}
          onBackWorkbench={() => handleNavigate('workbench')}
        />
      )}

      {currentView === 'skill-records' && (
        <SkillRecords
          records={skillRecords}
          sections={skillArchiveSections}
          onCreateTemplate={handleCreateTemplateFromSkill}
        />
      )}

      {currentView === 'membership' && <Membership />}
    </PageShell>
  );
}

export default App;
