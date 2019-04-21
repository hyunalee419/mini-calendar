import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './DayRow.scss';

const DayRow = ({ children }) => (
  <div className="mc-day-row">
    {children}
  </div>
);

DayRow.propTypes = {
  children: PropTypes.node.isRequired
};

export default memo(DayRow);
