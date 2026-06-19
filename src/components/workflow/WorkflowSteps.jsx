import React from 'react';

const defaultStepLabels = [
  { id: 'context-builder', label: '\u8865\u5145\u4e0a\u4e0b\u6587' },
  { id: 'prompt-preview', label: '\u751f\u6210 Prompt' },
  { id: 'ai-output', label: 'AI \u8f93\u51fa\u521d\u7a3f' },
  { id: 'output-check', label: 'Output Check' },
  { id: 'version-optimization', label: '\u7248\u672c\u4f18\u5316' },
  { id: 'save-result', label: '\u4fdd\u5b58\u5de5\u4f5c\u6d41' },
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
