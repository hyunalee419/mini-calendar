import React from 'react';
import './DatePicker.scss';

const DatePicker = ({
  className='',
  ...props
}) => (
  <input className={`mc-datepicker ${className}`} type="date" {...props} />
);

export default DatePicker;
