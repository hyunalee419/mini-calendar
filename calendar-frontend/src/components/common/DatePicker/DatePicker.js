import React from 'react';
import PropTypes from 'prop-types';
import './DatePicker.scss';

const DatePicker = ({
  className = '',
  ...props
}) => (
  <input className={`mc-datepicker ${className}`} type="date" {...props} />
);

DatePicker.propTypes = {
  className: PropTypes.string,
};

DatePicker.defaultProps = {
  className: '',
};

export default DatePicker;
