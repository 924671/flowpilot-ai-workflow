import React, { useEffect, useMemo, useRef, useState } from 'react';
import Balloon from './Balloon';
import StringLayer from './StringLayer';
import ChatEntry from './ChatEntry';
import ScissorsCursor from './ScissorsCursor';
import WorkflowModal from '../workflow/WorkflowModal';

const MODAL_DELAY_MS = 720;

function BalloonWorkbench({
  tasks,
  onEnterWorkflow,
  templates = [],
  onOpenTemplate,
  onManageTemplates,
}) {
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [cursorState, setCursorState] = useState({
    visible: false,
    x: 0,
    y: 0,
    variant: 'string',
  });
  const [activeTaskId, setActiveTaskId] = useState(null);
  const [cutTaskId, setCutTaskId] = useState(null);
  const [releasedTaskId, setReleasedTaskId] = useState(null);
  const [poppedTaskId, setPoppedTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalTimerRef = useRef(null);

  const activeTask = useMemo(
    () => tasks.find((task) => task.id === activeTaskId) ?? null,
    [activeTaskId, tasks],
  );

  useEffect(() => {
    return () => {
      if (modalTimerRef.current) {
        clearTimeout(modalTimerRef.current);
      }
    };
  }, []);

  const updateCursorPosition = (event) => {
    setCursorState((prev) => ({
      ...prev,
      x: event.clientX + 12,
      y: event.clientY + 12,
    }));
  };

  const handleHoverStart = (task, variant = 'string') => (event) => {
    if (activeTaskId && activeTaskId !== task.id) {
      return;
    }

    setHoveredTaskId(task.id);
    setCursorState({
      visible: true,
      x: event.clientX + 12,
      y: event.clientY + 12,
      variant,
    });
  };

  const handleHoverMove = (event) => {
    updateCursorPosition(event);
  };

  const handleHoverEnd = () => {
    setHoveredTaskId(null);
    setCursorState((prev) => ({
      ...prev,
      visible: false,
    }));
  };

  const handleActivate = (task, trigger = 'string') => (event) => {
    event.preventDefault();

    if (activeTaskId) {
      return;
    }

    setHoveredTaskId(null);
    setCursorState((prev) => ({
      ...prev,
      visible: false,
    }));
    setActiveTaskId(task.id);
    setCutTaskId(task.id);
    setReleasedTaskId(trigger === 'string' ? task.id : null);
    setPoppedTaskId(trigger === 'balloon' ? task.id : null);
    setIsModalOpen(false);

    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }

    modalTimerRef.current = setTimeout(() => {
      setIsModalOpen(true);
    }, MODAL_DELAY_MS);
  };

  const handleReset = () => {
    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
      modalTimerRef.current = null;
    }

    setHoveredTaskId(null);
    setCursorState({
      visible: false,
      x: 0,
      y: 0,
      variant: 'string',
    });
    setIsModalOpen(false);
    setActiveTaskId(null);
    setCutTaskId(null);
    setReleasedTaskId(null);
    setPoppedTaskId(null);
  };

  return (
    <div className="balloon-workbench">
      <div className="balloon-workbench__board">
        <div className="balloon-workbench__surface" aria-hidden="true" />
        <div
          className="balloon-workbench__halo balloon-workbench__halo--left"
          aria-hidden="true"
        />
        <div
          className="balloon-workbench__halo balloon-workbench__halo--right"
          aria-hidden="true"
        />

        {templates.length > 0 && (
          <aside className="balloon-workbench__template-overlay">
            <span className="balloon-workbench__template-badge">Template Entry</span>
            <p className="balloon-workbench__template-text">
              最近已经沉淀出 {templates.length} 个模板入口，刷新页面后也会保留。
            </p>

            <div className="balloon-workbench__template-list">
              {templates.slice(0, 1).map((template) => (
                <article key={template.id} className="balloon-workbench__template-item">
                  <div className="balloon-workbench__template-item-copy">
                    <h3 className="balloon-workbench__template-item-title">
                      {template.title}
                    </h3>
                    <p className="balloon-workbench__template-item-description">
                      {template.description}
                    </p>
                  </div>

                  <div className="balloon-workbench__template-item-actions">
                    <button
                      type="button"
                      className="balloon-workbench__template-action"
                      onClick={() => onOpenTemplate?.(template)}
                    >
                      使用模板
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="balloon-workbench__template-link"
              onClick={() => onManageTemplates?.()}
            >
              查看全部模板
            </button>
          </aside>
        )}

        <StringLayer
          tasks={tasks}
          cutTaskId={cutTaskId}
          activeTaskId={activeTaskId}
          hoveredTaskId={hoveredTaskId}
          onHoverStart={handleHoverStart}
          onHoverMove={handleHoverMove}
          onHoverEnd={handleHoverEnd}
          onActivate={handleActivate}
        />

        <div className="balloon-workbench__balloons">
          {tasks.map((task, index) => {
            const isReleased = releasedTaskId === task.id;
            const isPopped = poppedTaskId === task.id;
            const isDimmed = Boolean(activeTaskId) && activeTaskId !== task.id;

            return (
              <Balloon
                key={task.id}
                task={task}
                index={index}
                isReleased={isReleased}
                isPopped={isPopped}
                isDimmed={isDimmed}
                onHoverStart={handleHoverStart(task, 'balloon')}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                onActivate={handleActivate(task, 'balloon')}
              />
            );
          })}
        </div>

        <ChatEntry activeTask={activeTask} />

        <ScissorsCursor
          visible={cursorState.visible}
          x={cursorState.x}
          y={cursorState.y}
          variant={cursorState.variant}
        />

        <WorkflowModal
          task={activeTask}
          open={isModalOpen}
          onReset={handleReset}
          onEnterWorkflow={onEnterWorkflow}
        />
      </div>
    </div>
  );
}

export default BalloonWorkbench;
