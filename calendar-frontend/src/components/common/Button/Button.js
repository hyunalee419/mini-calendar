import React, { memo } from 'react';
import './Button.scss';

const Button = ({
  children, className,
  ...props
}) => (
  <button className={`mini-calendar-button ${className}`} {...props}>{children}</button>
);

export default memo(Button);
