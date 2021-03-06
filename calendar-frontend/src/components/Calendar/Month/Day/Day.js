import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event, { EventType } from 'components/Calendar/Event';
import './Day.scss';

export default class Day extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape(EventType)),
    onClick: PropTypes.func,
    onClickEvent: PropTypes.func,
    onDropEvent: PropTypes.func,
    isOff: PropTypes.bool,
  }

  static defaultProps = {
    events: null,
    onClick: undefined,
    onClickEvent: undefined,
    onDropEvent: undefined,
    isOff: false,
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  handleClick = () => {
    const {
      onClick, year, month, date,
    } = this.props;
    if (onClick) onClick(new Date(year, month, date));
  }

  handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('mcEventData');

    e.dataTransfer.clearData();

    const {
      year, month, date, onDropEvent,
    } = this.props;
    if (onDropEvent) onDropEvent(JSON.parse(data), new Date(year, month, date));
  }

  allowDrop = (e) => {
    e.preventDefault();
  }

  render() {
    const {
      date, events, onClickEvent, isOff,
    } = this.props;

    const renderEvents = events && events.map(
      event => <Event key={`event-date-${event.id}`} onClick={onClickEvent} {...event} />,
    );
    return (
      <div className={`mc-day ${isOff ? 'mc-day-off' : ''}`} onClick={this.handleClick} onDrop={this.handleDrop} onDragOver={this.allowDrop} role="complementary">
        <div>{date}</div>
        {renderEvents}
      </div>
    );
  }
}
