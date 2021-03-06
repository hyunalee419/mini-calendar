import React, { memo } from 'react';
import './Header.scss';

const WEEKS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Header = () => {
  const headers = WEEKS.map(
    week => <div key={`header-${week}`} className="mc-header">{week}</div>,
  );
  return (
    <div className="mini-calendar-header">
      {headers}
    </div>
  );
};

export default memo(Header);
