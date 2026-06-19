import React from 'react';

function PromptPreview({ task, promptSections }) {
  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Prompt Preview</span>
        <h3 className="execute-panel__title">{task.name} 结构化 Prompt</h3>
      </div>

      <div className="prompt-preview-card">
        {promptSections.map((section) => (
          <article key={section.title} className="prompt-preview-card__section">
            <h4 className="prompt-preview-card__heading">{section.title}</h4>
            <p className="prompt-preview-card__content">{section.content}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default PromptPreview;
