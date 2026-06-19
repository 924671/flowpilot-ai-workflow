import React from 'react';

function OutputCheck({ checkItems }) {
  return (
    <section className="execute-panel">
      <div className="execute-panel__header">
        <span className="execute-panel__eyebrow">Output Check</span>
        <h3 className="execute-panel__title">输出质检结果</h3>
      </div>

      <div className="output-check-grid">
        {checkItems.map((item) => (
          <article key={item.label} className="output-check-card">
            <div className="output-check-card__top">
              <h4 className="output-check-card__title">{item.label}</h4>
              <span
                className={`output-check-card__status output-check-card__status--${item.status}`}
              >
                {item.status}
              </span>
            </div>
            <p className="output-check-card__note">{item.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default OutputCheck;
