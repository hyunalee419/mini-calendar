import React, { memo } from 'react';
import './Input.scss';

const Input = ({
  className,
  ...props
}) => (
  <input className={`mini-calendar-input ${className}`} {...props} />
);

export default memo(Input);
