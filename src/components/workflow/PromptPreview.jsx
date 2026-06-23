import React from 'react';
import Button from '../common/Button';

function PromptPreview({ task, promptData, onEnterSession }) {
  const sections = promptData?.sections ?? [];

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Prompt 预览</span>
        <h3 className="execute-panel__title">{task.name} 的 Prompt 结构</h3>
      </div>

      <p className="execute-panel__description">
        当前 Prompt 会根据 上下文构建 中填写的内容动态生成，未填写的字段会显示“待补充”。
      </p>

      <div className="prompt-preview-card">
        {sections.map((section) => (
          <article key={section.title} className="prompt-preview-card__section">
            <h4 className="prompt-preview-card__heading">{section.title}</h4>
            <p className="prompt-preview-card__content">{section.content}</p>
          </article>
        ))}
      </div>

      <div className="card-footer">
        <Button onClick={onEnterSession}>进入 AI 协作工作区</Button>
      </div>
    </section>
  );
}

export default PromptPreview;
