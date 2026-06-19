import React from 'react';

const navigationItems = [
  { key: 'workbench', label: 'Workbench', shortLabel: 'W' },
  { key: 'task-library', label: 'Task Library', shortLabel: 'T' },
  { key: 'my-workflows', label: 'My Workflows', shortLabel: 'M' },
  { key: 'results-library', label: 'Results Library', shortLabel: 'R' },
  { key: 'skill-records', label: 'Skill Records', shortLabel: 'S' },
  { key: 'membership', label: 'Membership', shortLabel: 'P' },
];

function Sidebar({ activeKey, isCollapsed, onToggle, onNavigate }) {
  return (
    <aside
      className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`}
      aria-label="主导航"
    >
      <div className="sidebar__header">
        <div className="sidebar__brand">
          <span className="sidebar__brand-mark" aria-hidden="true">
            FP
          </span>
          {!isCollapsed && (
            <div className="sidebar__brand-copy">
              <strong className="sidebar__brand-title">FlowPilot</strong>
              <span className="sidebar__brand-subtitle">AI Workflow</span>
            </div>
          )}
        </div>

        <button
          type="button"
          className="sidebar__toggle"
          onClick={onToggle}
          aria-label={isCollapsed ? '展开侧边导航' : '折叠侧边导航'}
          aria-pressed={isCollapsed}
        >
          <span aria-hidden="true">{isCollapsed ? '>' : '<'}</span>
        </button>
      </div>

      <nav className="sidebar__nav">
        {navigationItems.map((item) => {
          const isActive = item.key === activeKey;

          return (
            <button
              key={item.key}
              type="button"
              className={`sidebar__nav-item ${isActive ? 'is-active' : ''}`}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => onNavigate?.(item.key)}
            >
              <span className="sidebar__nav-icon" aria-hidden="true">
                {item.shortLabel}
              </span>
              {!isCollapsed && <span className="sidebar__nav-label">{item.label}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

export default Sidebar;
