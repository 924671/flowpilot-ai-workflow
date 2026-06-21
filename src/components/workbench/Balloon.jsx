import React from 'react';

function Balloon({
  task,
  index,
  isReleased,
  isPopped,
  isDimmed,
  popOrigin,
  onHoverStart,
  onHoverMove,
  onHoverEnd,
  onActivate,
}) {
  const burstShards = [
    { id: 'a', x: '-92px', y: '-68px', rotate: -28, delay: '0ms', size: 'xl' },
    { id: 'b', x: '-38px', y: '-102px', rotate: -14, delay: '28ms', size: 'lg' },
    { id: 'c', x: '42px', y: '-96px', rotate: 18, delay: '56ms', size: 'lg' },
    { id: 'd', x: '98px', y: '-42px', rotate: 28, delay: '84ms', size: 'xl' },
    { id: 'e', x: '78px', y: '48px', rotate: 22, delay: '112ms', size: 'md' },
    { id: 'f', x: '18px', y: '88px', rotate: 10, delay: '140ms', size: 'sm' },
    { id: 'g', x: '-58px', y: '74px', rotate: -20, delay: '168ms', size: 'md' },
    { id: 'h', x: '-104px', y: '12px', rotate: -30, delay: '196ms', size: 'lg' },
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
        '--burst-x': popOrigin?.x ?? '50%',
        '--burst-y': popOrigin?.y ?? '44%',
      }}
      onPointerEnter={onHoverStart}
      onPointerMove={onHoverMove}
      onPointerLeave={onHoverEnd}
      onPointerDown={onActivate}
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
            className={`balloon__shard balloon__shard--${shard.size} balloon__shard--${shard.id}`}
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
