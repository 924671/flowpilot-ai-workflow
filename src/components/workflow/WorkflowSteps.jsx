import React from 'react';

const defaultStepLabels = [
  { id: 'context', label: 'Context Builder' },
  { id: 'prompt', label: 'Prompt Preview' },
  { id: 'session', label: 'AI Work Session' },
  { id: 'output', label: 'AI Output' },
  { id: 'check', label: 'Output Check' },
  { id: 'version', label: 'Version Optimization' },
  { id: 'save', label: 'Save Result' },
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
                  {isCompleted && <span className="workflow-steps__state">{'\u5df2\u51c6\u5907'}</span>}
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
