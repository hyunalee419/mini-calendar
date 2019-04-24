import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  children,
  className = '',
  buttonType = 'default',
  ...props
}) => (
  <button type="button" className={`mini-calendar-button ${className} ${buttonType}`} {...props}>
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  buttonType: PropTypes.oneOf(['default', 'danger', 'primary']),
};

Button.defaultProps = {
  className: '',
  buttonType: 'default',
};

export default memo(Button);
