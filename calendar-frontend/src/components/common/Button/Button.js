import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  children,
  className = '',
  buttonType = 'default',
  ...props
}) => (
  <button className={`mini-calendar-button ${className} ${buttonType}`} {...props}>{children}</button>
);

Button.propsTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(["default", "danger", "primary"])
};

export default memo(Button);
