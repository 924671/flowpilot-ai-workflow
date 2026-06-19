import React from 'react';

function Topbar({ title, description, onPrimaryAction }) {
  return (
    <header className="topbar">
      <div className="topbar__content">
        <div className="topbar__copy">
          <h1 className="topbar__title">{title}</h1>
          <p className="topbar__description">{description}</p>
        </div>

        <div className="topbar__actions">
          <button
            type="button"
            className="topbar__button"
            aria-label="Create new workflow"
            onClick={onPrimaryAction}
          >
            New Workflow
          </button>
        </div>
      </div>
    </header>
  );
}

export default Topbar;
