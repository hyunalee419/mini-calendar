import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Event.scss';

const Event = ({
  title,
  start,
  end,
  onClick
}) => {
  function handleClick() {
    if (onClick) onClick(title, start, end);
  }

  const hours = new Date(start).getHours();
  return (
    <div className="mc-segment">
      <button className="mc-event" onClick={handleClick}>
        <div className="mc-event-content" title={title}>{hours}시 {title}</div>
      </button>
    </div>
  );
}

export const EventType = {
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

Event.propTypes = {
  ...EventType,
  onClick: PropTypes.func
};

export default memo(Event);
