import React from 'react';
import { getContextFields } from '../../data/workflows';

function ContextBuilder({ task, contextValues, onFieldChange }) {
  const fields = getContextFields(contextValues);

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Context Builder</span>
        <h3 className="execute-panel__title">{task.name} 上下文表单</h3>
      </div>

      <div className="context-builder-form">
        {fields.map((field) => (
          <label key={field.key} className="context-builder-form__field">
            <span className="context-builder-form__label">{field.label}</span>
            <textarea
              className="context-builder-form__input"
              value={field.value}
              rows={field.key === 'projectName' || field.key === 'reportAudience' ? 2 : 4}
              onChange={(event) => onFieldChange?.(field.key, event.target.value)}
            />
          </label>
        ))}
      </div>
    </section>
  );
}

export default ContextBuilder;
