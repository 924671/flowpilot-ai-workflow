import { initialSkillRecords } from './methodNotes';
import {
  createWorkflowSession,
  initialResultsLibrary,
  initialWorkflowLibrary,
} from './workflows';
import { buildTemplateFromSkillRecord, sortTemplates } from './templateEntries';

const STORAGE_KEY = 'flowpilot.app.state.v5.clean-text';

const MOJIBAKE_PATTERN =
  /(鍏|绋|鏌|姹|瀛|妯|浣|瑙|杩|淇|褰|宸|闈|鐢|鈫|銆|�|€)/;

function getDefaultTemplates() {
  return sortTemplates(
    initialSkillRecords.map((record) => buildTemplateFromSkillRecord(record)),
  );
}

export function createDefaultAppState(taskList) {
  const initialTask = taskList[0];

  return {
    currentView: 'workbench',
    activeTaskId: initialTask?.id ?? '',
    workflowSession: initialTask ? createWorkflowSession(initialTask) : null,
    savedWorkflows: initialWorkflowLibrary,
    savedResults: initialResultsLibrary,
    skillRecords: initialSkillRecords,
    taskEntryTemplates: getDefaultTemplates(),
  };
}

export function loadAppState(taskList) {
  const defaults = createDefaultAppState(taskList);

  if (typeof window === 'undefined') {
    return defaults;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return defaults;
    }

    if (MOJIBAKE_PATTERN.test(raw)) {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaults;
    }

    const parsed = JSON.parse(raw);
    const nextActiveTaskId = taskList.some((task) => task.id === parsed.activeTaskId)
      ? parsed.activeTaskId
      : defaults.activeTaskId;
    const nextTask =
      taskList.find((task) => task.id === nextActiveTaskId) ?? taskList[0];

    return {
      currentView:
        typeof parsed.currentView === 'string'
          ? parsed.currentView
          : defaults.currentView,
      activeTaskId: nextActiveTaskId,
      workflowSession: nextTask
        ? createWorkflowSession(nextTask, parsed.workflowSession ?? {})
        : defaults.workflowSession,
      savedWorkflows: Array.isArray(parsed.savedWorkflows)
        ? parsed.savedWorkflows.length > 0
          ? parsed.savedWorkflows
          : defaults.savedWorkflows
        : defaults.savedWorkflows,
      savedResults: Array.isArray(parsed.savedResults)
        ? parsed.savedResults.length > 0
          ? parsed.savedResults
          : defaults.savedResults
        : defaults.savedResults,
      skillRecords: Array.isArray(parsed.skillRecords)
        ? parsed.skillRecords
        : defaults.skillRecords,
      taskEntryTemplates: Array.isArray(parsed.taskEntryTemplates)
        ? sortTemplates(parsed.taskEntryTemplates)
        : defaults.taskEntryTemplates,
    };
  } catch (error) {
    console.warn('Failed to load FlowPilot local state.', error);
    return defaults;
  }
}

export function persistAppState(state) {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn('Failed to persist FlowPilot local state.', error);
  }
}
