import React from 'react';

function StringLayer({
  tasks,
  cutTaskId,
  activeTaskId,
  hoveredTaskId,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onActivate,
}) {
  return (
    <svg
      className="string-layer"
      viewBox="0 0 1000 760"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {tasks.map((task) => {
        const isCut = cutTaskId === task.id;
        const isHovered = hoveredTaskId === task.id;
        const isDisabled = Boolean(activeTaskId) && activeTaskId !== task.id;

        return (
          <g key={task.id} className="string-layer__group">
            <path
              d={task.stringPath}
              className={`string-layer__path string ${isCut ? 'is-cut' : ''} ${isHovered ? 'is-hovered' : ''}`}
            />
            <path
              d={task.stringPath}
              className={`string-layer__hit string-hit ${isDisabled ? 'is-disabled' : ''}`}
              onMouseEnter={onHoverStart(task, 'string')}
              onMouseMove={onHoverMove}
              onMouseLeave={onHoverEnd}
              onClick={onActivate(task, 'string')}
            />
          </g>
        );
      })}

      <circle className="string-layer__anchor" cx="500" cy="548" r="4" />
    </svg>
  );
}

export default StringLayer;
