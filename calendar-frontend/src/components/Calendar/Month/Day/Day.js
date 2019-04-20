import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Day.scss';

const Day = ({
  date,
  isOff=false
}) => (
  <div className={`mc-day ${isOff ? 'mc-day-off' : ''}`}>
    {date}
  </div>
);

Day.propTypes = {
  date: PropTypes.number.isRequired,
  isOff: PropTypes.bool
};

export default memo(Day);
