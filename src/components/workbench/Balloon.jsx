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
  const burstShards = [
    { id: 'a', x: '-42%', y: '-10%', rotate: -28, delay: '0ms' },
    { id: 'b', x: '-18%', y: '-22%', rotate: -8, delay: '36ms' },
    { id: 'c', x: '8%', y: '-18%', rotate: 12, delay: '18ms' },
    { id: 'd', x: '28%', y: '-12%', rotate: 26, delay: '54ms' },
    { id: 'e', x: '-30%', y: '8%', rotate: -18, delay: '72ms' },
    { id: 'f', x: '18%', y: '10%', rotate: 20, delay: '90ms' },
  ];

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

      <span className="balloon__burst" aria-hidden="true">
        {burstShards.map((shard) => (
          <span
            key={shard.id}
            className={`balloon__shard balloon__shard--${shard.id}`}
            style={{
              '--shard-x': shard.x,
              '--shard-y': shard.y,
              '--shard-rotate': `${shard.rotate}deg`,
              '--shard-delay': shard.delay,
            }}
          />
        ))}
      </span>
    </button>
  );
}

export default Balloon;
