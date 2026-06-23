import React from 'react';

const defaultStepLabels = [
  { id: 'context', label: '上下文构建' },
  { id: 'prompt', label: 'Prompt 预览' },
  { id: 'session', label: 'AI 协作工作区' },
  { id: 'output', label: 'AI 输出' },
  { id: 'check', label: '输出质检' },
  { id: 'version', label: '版本优化' },
  { id: 'save', label: '保存结果' },
];

function WorkflowSteps({
  steps = defaultStepLabels,
  variant = 'summary',
  currentStepId,
  completedStepIndex = -1,
  onStepChange,
}) {
  return (
    <ol className={`workflow-steps workflow-steps--${variant}`}>
      {steps.map((step, index) => {
        const isActive = step.id === currentStepId;
        const isCompleted = index <= completedStepIndex;

        return (
          <li key={step.id ?? step.label} className={`workflow-steps__item ${isActive ? 'is-active' : ''}`}>
            {variant === 'navigation' ? (
              <button
                type="button"
                className="workflow-steps__button"
                onClick={() => onStepChange?.(step.id)}
              >
                <span className="workflow-steps__index">{index + 1}</span>
                <span className="workflow-steps__meta">
                  <span className="workflow-steps__label">{step.label}</span>
                  {isCompleted && <span className="workflow-steps__state">{'已准备'}</span>}
                </span>
              </button>
            ) : (
              <>
                <span className="workflow-steps__index">{index + 1}</span>
                <span className="workflow-steps__label">{step.label}</span>
              </>
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default WorkflowSteps;
