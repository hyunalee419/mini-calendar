import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
  className,
  ...props
}) => (
  <input className={`mini-calendar-input ${className}`} {...props} />
);

Input.propTypes = {
  className: PropTypes.string,
};

Input.defaultProps = {
  className: '',
};

export default memo(Input);
