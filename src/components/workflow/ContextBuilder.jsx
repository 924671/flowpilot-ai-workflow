import React from 'react';
import Button from '../common/Button';

function ContextBuilder({
  task,
  contextData,
  fields,
  onFieldChange,
  onGeneratePrompt,
}) {
  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Context Builder</span>
        <h3 className="execute-panel__title">{task.name} 上下文表单</h3>
      </div>

      <p className="execute-panel__description">
        先补全任务背景、目标、素材、数据结果和汇报对象，再进入 Prompt Preview。
      </p>

      <form
        className="context-builder-form"
        onSubmit={(event) => {
          event.preventDefault();
          onGeneratePrompt?.();
        }}
      >
        {fields.map((field) => (
          <label key={field.key} className="context-builder-form__field">
            <span className="context-builder-form__label">{field.label}</span>
            {field.type === 'input' ? (
              <input
                className="context-builder-form__input context-builder-form__input--single"
                type="text"
                value={contextData[field.key] ?? ''}
                onChange={(event) => onFieldChange?.(field.key, event.target.value)}
              />
            ) : (
              <textarea
                className="context-builder-form__input"
                value={contextData[field.key] ?? ''}
                rows={4}
                onChange={(event) => onFieldChange?.(field.key, event.target.value)}
              />
            )}
          </label>
        ))}

        <div className="context-builder-form__actions">
          <Button type="submit">生成 Prompt</Button>
        </div>
      </form>
    </section>
  );
}

export default ContextBuilder;
