import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

function PageShell({ currentPage, children, onNavigate, onPrimaryAction }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="app-shell">
      <div className="desktop-stage">
        <div className="desktop-canvas">
          <Sidebar
            activeKey={currentPage.key}
            isCollapsed={isSidebarCollapsed}
            onToggle={() => setIsSidebarCollapsed((value) => !value)}
            onNavigate={onNavigate}
          />

          <div className="desktop-content">
            <Topbar
              title={currentPage.title}
              description={currentPage.description}
              onPrimaryAction={onPrimaryAction}
            />

            <main className="page-content">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PageShell;
