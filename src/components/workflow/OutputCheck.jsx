import React from 'react';
import Button from '../common/Button';

const statusClassMap = {
  充分: 'sufficient',
  需补充: 'needs-more',
  存在风险: 'risk',
};

function OutputCheck({ checkItems = [], onGoToVersion }) {
  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Output Check</span>
        <h3 className="execute-panel__title">输出质检结果</h3>
      </div>

      <p className="execute-panel__description">
        基于当前上下文和 AI Output，检查结果是否具体、有支撑、匹配对象，并判断是否能继续提交或生成版本。
      </p>

      <div className="output-check-grid">
        {checkItems.map((item) => (
          <article key={item.label} className="output-check-card">
            <div className="output-check-card__top">
              <h4 className="output-check-card__title">{item.label}</h4>
              <span
                className={`output-check-card__status output-check-card__status--${
                  statusClassMap[item.status] ?? 'neutral'
                }`}
              >
                {item.status}
              </span>
            </div>
            <p className="output-check-card__note">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="card-footer">
        <Button onClick={onGoToVersion}>进入版本优化</Button>
      </div>
    </section>
  );
}

export default OutputCheck;
