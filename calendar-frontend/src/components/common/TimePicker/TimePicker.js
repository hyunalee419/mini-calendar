import React from 'react';
import PropTypes from 'prop-types';
import './TimePicker.scss';

const TimePicker = ({
  className,
  ...props
}) => (
  <input className={`mc-timepicker ${className}`} type="time" {...props} />
);

TimePicker.propTypes = {
  className: PropTypes.string,
};

TimePicker.defaultProps = {
  className: '',
};

export default TimePicker;
