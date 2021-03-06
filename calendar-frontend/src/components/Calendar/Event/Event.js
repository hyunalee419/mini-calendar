import React, { memo } from 'react';
import PropTypes from 'prop-types';
import './Event.scss';

const Event = ({
  id,
  title,
  start,
  end,
  onClick,
}) => {
  function handleClick(e) {
    e.stopPropagation();
    if (onClick) {
      onClick({
        id, title, start, end,
      });
    }
  }

  function handleDrag(e) {
    e.dataTransfer.setData(
      'mcEventData',
      JSON.stringify(
        {
          id, title, start, end,
        },
      ),
    );
  }

  const hours = new Date(start).getHours();
  return (
    <div className="mc-segment" draggable="true" onDragStart={handleDrag}>
      <button type="button" className="mc-event" onClick={handleClick}>
        <div className="mc-event-content" title={title}>
          {hours}시 {title}
        </div>
      </button>
    </div>
  );
};

export const EventType = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  end: PropTypes.string.isRequired,
};

Event.propTypes = {
  ...EventType,
  onClick: PropTypes.func,
};

Event.defaultProps = {
  onClick: undefined,
};

export default memo(Event);
