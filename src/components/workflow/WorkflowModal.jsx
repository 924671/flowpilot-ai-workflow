import React from 'react';
import WorkflowSteps from './WorkflowSteps';

function WorkflowModal({ task, open, activationTrigger, onReset, onEnterWorkflow }) {
  if (!open || !task) {
    return null;
  }

  const description =
    activationTrigger === 'balloon'
      ? '气球已被戳破，正在把这个任务切换为对应 AI 工作流。'
      : '任务线已被剪断，正在把这个任务切换为对应 AI 工作流。';

  return (
    <div
      className="workflow-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="workflow-modal-title"
    >
      <div className="workflow-modal__backdrop" />
      <div className="workflow-modal__card">
        <div className="workflow-modal__header">
          <span className="workflow-modal__eyebrow">Workflow Ready</span>
          <h3 id="workflow-modal-title" className="workflow-modal__title">
            {task.name} 工作流
          </h3>
          <p className="workflow-modal__description">{description}</p>
        </div>

        <WorkflowSteps />

        <div className="workflow-modal__actions">
          <button
            type="button"
            className="workflow-modal__button workflow-modal__button--ghost"
            onClick={onReset}
          >
            重置气球
          </button>
          <button
            type="button"
            className="workflow-modal__button workflow-modal__button--primary"
            onClick={() => onEnterWorkflow?.(task.id)}
          >
            进入 Context Builder
          </button>
        </div>
      </div>
    </div>
  );
}

export default WorkflowModal;
