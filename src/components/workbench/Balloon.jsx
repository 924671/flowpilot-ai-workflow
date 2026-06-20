import React from 'react';

function Balloon({
  task,
  index,
  isReleased,
  isPopped,
  isDimmed,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onActivate,
}) {
  const positionOverrides = {
    'project-review': { x: -18, y: -14 },
    'weekly-report': { x: -6, y: -28 },
    'campaign-plan': { x: 12, y: -18 },
    'meeting-notes': { x: 20, y: -6 },
    'competitor-analysis': { x: -10, y: -48 },
    'ppt-outline': { x: 0, y: -42 },
  };

  const offset = positionOverrides[task.id] ?? { x: 0, y: 0 };

  return (
    <button
      type="button"
      className={`balloon balloon--${task.color} ${isReleased ? 'is-released' : ''} ${isPopped ? 'is-popped' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
      style={{
        left: `${task.balloonPosition.x + offset.x}px`,
        top: `${task.balloonPosition.y + offset.y}px`,
        animationDelay: `${index * 260}ms`,
      }}
      onMouseEnter={onHoverStart}
      onMouseMove={onHoverMove}
      onMouseLeave={onHoverEnd}
      onClick={onActivate}
      disabled={isReleased || isPopped || isDimmed}
      aria-label={task.name}
    >
      <div className="balloon__body">
        <span className="balloon__subtitle">{task.subtitle}</span>
        <h3 className="balloon__title">{task.name}</h3>

        <div className="balloon__tags" aria-label="Skill tags">
          {task.skillTags.slice(0, 2).map((tag) => (
            <span key={tag} className="balloon__tag">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}

export default Balloon;
