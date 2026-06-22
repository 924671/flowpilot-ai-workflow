import React from 'react';
import Button from '../common/Button';

const fallbackSections = [
  {
    id: 'data-summary',
    title: '数据摘要',
    content: '当前还没有生成协作输出，系统会先展示一版默认初稿结构。',
  },
  {
    id: 'result-interpretation',
    title: '结果解读',
    content: '请先回到 AI Work Session 生成初稿建议，再进入更完整的输出内容。',
  },
  {
    id: 'issue-review',
    title: '问题识别',
    content: '待补充',
  },
  {
    id: 'next-actions',
    title: '下一步建议',
    content: '待补充',
  },
  {
    id: 'optimize-direction',
    title: '可继续优化方向',
    content: '可继续扩展为领导汇报版、团队同步版或 PPT 大纲版。',
  },
];

function AIOutput({ taskName, aiOutput, onGoToCheck }) {
  const sections = aiOutput?.sections?.length ? aiOutput.sections : fallbackSections;

  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">AI Output</span>
        <h3 className="execute-panel__title">{taskName} 输出初稿</h3>
      </div>

      <p className="execute-panel__description">
        以下内容基于 Context Builder 和 AI Work Session 中的协作记录生成。
      </p>

      <div className="ai-output-grid">
        {sections.map((section) => (
          <article key={section.id} className="ai-output-card">
            <h4 className="ai-output-card__title">{section.title}</h4>
            <p className="ai-output-card__content">{section.content}</p>
          </article>
        ))}
      </div>

      <div className="card-footer">
        <Button onClick={onGoToCheck}>进入 Output Check</Button>
      </div>
    </section>
  );
}

export default AIOutput;
