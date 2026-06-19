import React, { useEffect, useMemo, useState } from 'react';
import PageShell from './components/layout/PageShell';
import Workbench from './pages/Workbench';
import WorkflowExecute from './pages/WorkflowExecute';
import TaskLibrary from './pages/TaskLibrary';
import MyWorkflows from './pages/MyWorkflows';
import ResultsLibrary from './pages/ResultsLibrary';
import MethodArchive from './pages/MethodArchive';
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
    description: '浏览任务入口，并管理已经沉淀下来的模板入口。',
  },
  'my-workflows': {
    key: 'my-workflows',
    title: 'My Workflows',
    description: '继续处理已开始的工作流，并从上次保存步骤继续编辑。',
  },
  'results-library': {
    key: 'results-library',
    title: 'Results Library',
    description: '从已保存结果继续生成新版本，也可以反向沉淀成模板入口。',
  },
  'skill-records': {
    key: 'skill-records',
    title: 'Skill Records',
    description: '把真实任务中的方法记录反向沉淀为可复用的模板入口。',
  },
  membership: {
    key: 'membership',
    title: 'Membership',
    description: '查看不同方案的能力覆盖范围与适用场景。',
  },
};

function App() {
  const initialState = useMemo(() => loadAppState(tasks), []);

  const [currentView, setCurrentView] = useState(initialState.currentView);
  const [activeTaskId, setActiveTaskId] = useState(initialState.activeTaskId);
  const [workflowSession, setWorkflowSession] = useState(initialState.workflowSession);
  const [savedWorkflows, setSavedWorkflows] = useState(initialState.savedWorkflows);
  const [savedResults, setSavedResults] = useState(initialState.savedResults);
  const [skillRecords, setSkillRecords] = useState(initialState.skillRecords);
  const [taskEntryTemplates, setTaskEntryTemplates] = useState(
    initialState.taskEntryTemplates,
  );

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) ?? tasks[0],
    [activeTaskId],
  );

  const activeTemplate = useMemo(
    () =>
      workflowSession?.linkedTemplateId
        ? taskEntryTemplates.find((item) => item.id === workflowSession.linkedTemplateId) ??
          null
        : null,
    [taskEntryTemplates, workflowSession?.linkedTemplateId],
  );

  const currentPage =
    currentView === 'workflow-execute'
      ? {
          key: 'workbench',
          title: `${activeTask.name} 工作流`,
          description: '按照步骤完成上下文构建、Prompt 预览、输出质检与版本优化。',
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
  };

  const upsertTemplate = (nextTemplate) => {
    setTaskEntryTemplates((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== nextTemplate.id);
      return sortTemplates([nextTemplate, ...filtered]);
    });
  };

  const updateTemplateById = (templateId, updater) => {
    setTaskEntryTemplates((prevItems) =>
      sortTemplates(
        prevItems.map((item) => (item.id === templateId ? updater(item) : item)),
      ),
    );
  };

  const handleOpenWorkflow = (taskId) => {
    openWorkflowWithSession(taskId, {
      sourceType: 'task-entry',
      sourceLabel: '高频任务入口',
    });
  };

  const handleOpenTemplateWorkflow = (templateEntry) => {
    const nextTemplate = markTemplateUsed(templateEntry);

    setTaskEntryTemplates((prevItems) =>
      sortTemplates(
        prevItems.map((item) => (item.id === templateEntry.id ? nextTemplate : item)),
      ),
    );

    openWorkflowWithSession(templateEntry.taskId, {
      contextValues: templateEntry.contextValues,
      generatedVersions: templateEntry.generatedVersions,
      currentStepId: 'context-builder',
      sourceType: 'skill-template',
      sourceLabel: `${templateEntry.title} · ${templateEntry.sourceLabel}`,
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
    const previousTemplate = taskEntryTemplates.find(
      (item) => item.id === `${record.id}-template`,
    );
    const nextTemplate = buildTemplateFromSkillRecord(record, previousTemplate);

    upsertTemplate(nextTemplate);
    setCurrentView('workbench');
  };

  const handleCreateTemplateFromResult = (result) => {
    const previousTemplate = taskEntryTemplates.find(
      (item) => item.id === `${result.id}-template`,
    );
    const nextTemplate = buildTemplateFromResult(result, previousTemplate);

    upsertTemplate(nextTemplate);
    setCurrentView('task-library');
  };

  const handleCreateTemplateFromSession = (mode = 'auto') => {
    const previousTemplate =
      mode !== 'new' && workflowSession.linkedTemplateId
        ? taskEntryTemplates.find((item) => item.id === workflowSession.linkedTemplateId) ??
          null
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
    setTaskEntryTemplates((prevItems) =>
      prevItems.filter((item) => item.id !== templateId),
    );
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
  };

  const handleWorkflowSessionChange = (updater) => {
    setWorkflowSession((prevSession) =>
      typeof updater === 'function' ? updater(prevSession) : updater,
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

      {currentView === 'my-workflows' && (
        <MyWorkflows workflows={savedWorkflows} onOpenWorkflow={handleResumeWorkflow} />
      )}

      {currentView === 'results-library' && (
        <ResultsLibrary
          results={savedResults}
          onContinueResult={handleContinueFromResult}
          onCreateTemplate={handleCreateTemplateFromResult}
        />
      )}

      {currentView === 'skill-records' && (
        <MethodArchive
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
