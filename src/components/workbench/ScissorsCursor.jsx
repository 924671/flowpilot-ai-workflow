import React from 'react';

function ScissorsCursor({
  visible,
  x,
  y,
  variant = 'string',
}) {
  const isPin = variant === 'balloon';

  return (
    <div
      className={`scissors-cursor ${visible ? 'is-visible' : ''} ${isPin ? 'scissors-cursor--pin' : 'scissors-cursor--cut'}`}
      style={{
        transform: `translate3d(${x}px, ${y}px, 0)`,
      }}
      aria-hidden="true"
    >
      {isPin ? (
        <span className="scissors-cursor__pin">
          <span className="scissors-cursor__pin-head" />
          <span className="scissors-cursor__pin-shaft" />
        </span>
      ) : (
        <span className="scissors-cursor__icon">✂</span>
      )}
    </div>
  );
}

export default ScissorsCursor;
