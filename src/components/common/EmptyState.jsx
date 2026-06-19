import React from 'react';

function EmptyState({ title, description, compact = false }) {
  return (
    <section className={`empty-state ${compact ? 'empty-state--compact' : ''}`}>
      <div className="empty-state__content">
        <h2 className="empty-state__title">{title}</h2>
        <p className="empty-state__description">{description}</p>
      </div>
    </section>
  );
}

export default EmptyState;
