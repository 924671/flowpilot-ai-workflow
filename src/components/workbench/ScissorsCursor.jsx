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
        <span className="scissors-cursor__icon">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M5 7.75a2.75 2.75 0 1 0 0 5.5a2.75 2.75 0 0 0 2.27-4.3L19 2.75"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 10.75a2.75 2.75 0 1 0 2.27 4.3L11.7 12L19 20.25"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M13.1 10.55L15.35 8.3"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}
    </div>
  );
}

export default ScissorsCursor;
