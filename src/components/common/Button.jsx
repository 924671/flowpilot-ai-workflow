import React from 'react';

function Button({ children, className = '', variant = 'primary', ...props }) {
  return (
    <button
      type="button"
      className={`button button--${variant} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
