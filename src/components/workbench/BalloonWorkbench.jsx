import React, { useEffect, useMemo, useRef, useState } from 'react';
import Balloon from './Balloon';
import StringLayer from './StringLayer';
import ChatEntry from './ChatEntry';
import ScissorsCursor from './ScissorsCursor';
import WorkflowModal from '../workflow/WorkflowModal';

const MODAL_DELAY_MS = 720;
const POP_MODAL_DELAY_MS = 860;

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
  const [activationTrigger, setActivationTrigger] = useState(null);
  const [cutTaskId, setCutTaskId] = useState(null);
  const [releasedTaskId, setReleasedTaskId] = useState(null);
  const [poppedTaskId, setPoppedTaskId] = useState(null);
  const [popOrigin, setPopOrigin] = useState({
    taskId: null,
    x: '50%',
    y: '44%',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [boardMetrics, setBoardMetrics] = useState({
    width: 1000,
    height: 792,
    anchorX: 500,
    anchorY: 638,
  });
  const modalTimerRef = useRef(null);
  const activationLockRef = useRef(false);
  const boardRef = useRef(null);
  const chatAnchorRef = useRef(null);

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

  useEffect(() => {
    const updateMetrics = () => {
      const boardRect = boardRef.current?.getBoundingClientRect();
      const anchorRect = chatAnchorRef.current?.getBoundingClientRect();

      if (!boardRect) {
        return;
      }

      const nextMetrics = {
        width: boardRect.width,
        height: boardRect.height,
        anchorX: anchorRect
          ? anchorRect.left - boardRect.left + anchorRect.width / 2
          : boardRect.width / 2,
        anchorY: anchorRect
          ? anchorRect.top - boardRect.top + anchorRect.height / 2
          : boardRect.height - 154,
      };

      setBoardMetrics((prev) => {
        const changed =
          Math.abs(prev.width - nextMetrics.width) > 1 ||
          Math.abs(prev.height - nextMetrics.height) > 1 ||
          Math.abs(prev.anchorX - nextMetrics.anchorX) > 1 ||
          Math.abs(prev.anchorY - nextMetrics.anchorY) > 1;

        return changed ? nextMetrics : prev;
      });
    };

    updateMetrics();

    const resizeObserver = new ResizeObserver(() => {
      updateMetrics();
    });

    if (boardRef.current) {
      resizeObserver.observe(boardRef.current);
    }

    if (chatAnchorRef.current) {
      resizeObserver.observe(chatAnchorRef.current);
    }

    window.addEventListener('resize', updateMetrics);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateMetrics);
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

    if (activeTaskId || activationLockRef.current) {
      return;
    }

    activationLockRef.current = true;

    if (trigger === 'balloon' && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      const relativeX = ((event.clientX - rect.left) / rect.width) * 100;
      const relativeY = ((event.clientY - rect.top) / rect.height) * 100;

      setPopOrigin({
        taskId: task.id,
        x: `${Math.max(18, Math.min(82, relativeX))}%`,
        y: `${Math.max(18, Math.min(58, relativeY))}%`,
      });
    } else {
      setPopOrigin({
        taskId: null,
        x: '50%',
        y: '44%',
      });
    }

    setHoveredTaskId(null);
    setCursorState((prev) => ({
      ...prev,
      visible: false,
    }));
    setActiveTaskId(task.id);
    setActivationTrigger(trigger);
    setCutTaskId(task.id);
    setReleasedTaskId(trigger === 'string' ? task.id : null);
    setPoppedTaskId(trigger === 'balloon' ? task.id : null);
    setIsModalOpen(false);

    if (modalTimerRef.current) {
      clearTimeout(modalTimerRef.current);
    }

    modalTimerRef.current = setTimeout(() => {
      setIsModalOpen(true);
    }, trigger === 'balloon' ? POP_MODAL_DELAY_MS : MODAL_DELAY_MS);
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
    setActivationTrigger(null);
    setCutTaskId(null);
    setReleasedTaskId(null);
    setPoppedTaskId(null);
    setPopOrigin({
      taskId: null,
      x: '50%',
      y: '44%',
    });
    activationLockRef.current = false;
  };

  return (
    <div className="balloon-workbench">
      <div ref={boardRef} className="balloon-workbench__board">
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
          boardSize={{
            width: boardMetrics.width,
            height: boardMetrics.height,
          }}
          anchorPoint={{
            x: boardMetrics.anchorX,
            y: boardMetrics.anchorY,
          }}
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
                popOrigin={popOrigin.taskId === task.id ? popOrigin : null}
                onHoverStart={handleHoverStart(task, 'balloon')}
                onHoverMove={handleHoverMove}
                onHoverEnd={handleHoverEnd}
                onActivate={handleActivate(task, 'balloon')}
              />
            );
          })}
        </div>

        <ChatEntry
          ref={chatAnchorRef}
          activeTask={activeTask}
          activationTrigger={activationTrigger}
        />

        <ScissorsCursor
          visible={cursorState.visible}
          x={cursorState.x}
          y={cursorState.y}
          variant={cursorState.variant}
        />

        <WorkflowModal
          task={activeTask}
          open={isModalOpen}
          activationTrigger={activationTrigger}
          onReset={handleReset}
          onEnterWorkflow={onEnterWorkflow}
        />
      </div>
    </div>
  );
}

export default BalloonWorkbench;
