import React from 'react';
import './TimePicker.scss';

const TimePicker = ({
  className='',
  ...props
}) => (
  <input className={`mc-timepicker ${className}`} type="time" {...props} />
);

export default TimePicker;
