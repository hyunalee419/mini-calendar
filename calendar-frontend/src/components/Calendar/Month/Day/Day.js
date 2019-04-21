import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Event, { EventType } from '../../Event';
import './Day.scss';

export default class Day extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    date: PropTypes.number.isRequired,
    events: PropTypes.arrayOf(PropTypes.shape(EventType)),
    onClick: PropTypes.func,
    onClickEvent: PropTypes.func,
    isOff: PropTypes.bool
  }

  static defaultProps = {
    isOff: false
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  handleClick = () => {
    const { onClick, date } = this.props;
    if (onClick) onClick(date);
  }

  render() {
    const {
      date, events, onClickEvent, isOff
    } = this.props;

    const _events = events && events.map((event, i) => <Event key={`event-date-${i}`} onClick={onClickEvent} {...event} />);
    return (
      <div className={`mc-day ${isOff ? 'mc-day-off' : ''}`} onClick={this.handleClick}>
        <div>{date}</div>
        {_events}
      </div>
    )
  }
}
