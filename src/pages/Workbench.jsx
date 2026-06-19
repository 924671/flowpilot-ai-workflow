import React from 'react';
import tasks from '../data/tasks';
import BalloonWorkbench from '../components/workbench/BalloonWorkbench';

function Workbench({
  onEnterWorkflow,
  templates = [],
  onOpenTemplate,
  onManageTemplates,
}) {
  return (
    <section className="workbench-page">
      <div className="workbench-page__intro">
        <div className="workbench-page__intro-copy">
          <h2 className="workbench-page__title">
            今天想让 AI 帮你完成什么工作？
          </h2>
          <p className="workbench-page__description">
            气球代表六个高频职场任务，线绑在下方工作入口，剪断后进入对应工作流。
          </p>
        </div>
      </div>

      <BalloonWorkbench
        tasks={tasks}
        onEnterWorkflow={onEnterWorkflow}
        templates={templates}
        onOpenTemplate={onOpenTemplate}
        onManageTemplates={onManageTemplates}
      />
    </section>
  );
}

export default Workbench;
