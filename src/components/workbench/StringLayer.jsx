import React from 'react';

const positionOverrides = {
  'project-review': { x: -18, y: -14 },
  'weekly-report': { x: -6, y: -28 },
  'campaign-plan': { x: 12, y: -18 },
  'meeting-notes': { x: 20, y: -6 },
  'competitor-analysis': { x: -10, y: -48 },
  'ppt-outline': { x: 0, y: -42 },
};

const BALLOON_LAYER_TOP = 40;
const BALLOON_WIDTH = 154;
const BALLOON_BODY_HEIGHT = 190;
const BALLOON_KNOT_OFFSET = 14;

function buildStringPath(task, anchorPoint, boardSize) {
  const offset = positionOverrides[task.id] ?? { x: 0, y: 0 };
  const startX = task.balloonPosition.x + offset.x + BALLOON_WIDTH / 2;
  const startY =
    BALLOON_LAYER_TOP + task.balloonPosition.y + offset.y + BALLOON_BODY_HEIGHT + BALLOON_KNOT_OFFSET;
  const anchorX = anchorPoint.x;
  const anchorY = anchorPoint.y;

  const horizontalDelta = anchorX - startX;
  const controlOneX = startX + horizontalDelta * 0.16;
  const controlOneY = startY + Math.max(54, (anchorY - startY) * 0.34);
  const controlTwoX = anchorX - horizontalDelta * 0.22;
  const controlTwoY = anchorY - Math.max(48, (anchorY - startY) * 0.22);

  return `M ${startX} ${startY} C ${controlOneX} ${controlOneY}, ${controlTwoX} ${controlTwoY}, ${anchorX} ${anchorY}`;
}

function StringLayer({
  tasks,
  cutTaskId,
  activeTaskId,
  hoveredTaskId,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onActivate,
  boardSize,
  anchorPoint,
}) {
  const svgWidth = Math.max(boardSize?.width ?? 1000, 1000);
  const svgHeight = Math.max(boardSize?.height ?? 760, 760);
  const resolvedAnchor = anchorPoint ?? {
    x: svgWidth / 2,
    y: svgHeight - 154,
  };

  return (
    <svg
      className="string-layer"
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {tasks.map((task) => {
        const isCut = cutTaskId === task.id;
        const isHovered = hoveredTaskId === task.id;
        const isDisabled = Boolean(activeTaskId) && activeTaskId !== task.id;
        const path = buildStringPath(task, resolvedAnchor, boardSize);

        return (
          <g key={task.id} className="string-layer__group">
            <path
              d={path}
              className={`string-layer__path string ${isCut ? 'is-cut' : ''} ${isHovered ? 'is-hovered' : ''}`}
              pointerEvents="none"
            />
            <path
              d={path}
              className={`string-layer__hit string-hit ${isDisabled ? 'is-disabled' : ''}`}
              stroke="transparent"
              vectorEffect="non-scaling-stroke"
              pointerEvents={isDisabled ? 'none' : 'stroke'}
              onPointerEnter={onHoverStart(task, 'string')}
              onPointerMove={onHoverMove}
              onPointerLeave={onHoverEnd}
              onPointerDown={onActivate(task, 'string')}
              onClick={onActivate(task, 'string')}
            />
          </g>
        );
      })}

      <circle
        className="string-layer__anchor"
        cx={resolvedAnchor.x}
        cy={resolvedAnchor.y}
        r="4"
      />
    </svg>
  );
}

export default StringLayer;
