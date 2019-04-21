import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Toolbar from './Toolbar';
import Month from './Month';
import { EventType } from './Event';
import { CALENDAR_TYPE } from '../../utils/enums';
import './Calendar.scss';

export default class Calendar extends Component {
  static propTypes = {
    type: PropTypes.oneOf([CALENDAR_TYPE.month, CALENDAR_TYPE.week]),
    events: PropTypes.arrayOf(PropTypes.shape(EventType)),
    onClickDay: PropTypes.func,
    onClickEvent: PropTypes.func
  }

  static defaultProps = {
    type: CALENDAR_TYPE.month,
    events: null
  }

  constructor(props) {
    super(props);

    const today = new Date();
    this.state = {
      type: props.type,
      year: today.getFullYear(),
      month: today.getMonth() // index (real, month: index + 1)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.type !== nextProps.type) {
      this.setState({ type: nextProps.type });
    }
  }

  handleChangeNav = (year, month) => {
    this.setState({ year, month });
  }

  handleChangeCalendarType = (type) => {
    this.setState({ type });
  }

  render() {
    const { events, onClickDay, onClickEvent } = this.props;
    const { type, year, month } = this.state;
    return (
      <div className="mini-calendar">
        <Toolbar
          type={type}
          year={year}
          month={month}
          onClickPrev={this.handleChangeNav}
          onClickToday={this.handleChangeNav}
          onClickNext={this.handleChangeNav}
          onClickMonth={this.handleChangeCalendarType}
          onClickWeek={this.handleChangeCalendarType}
        />
        { type === CALENDAR_TYPE.month
          ? (
            <Month year={year} month={month} events={events} onClickDay={onClickDay} onClickEvent={onClickEvent} />
          ) : null
        }
      </div>
    )
  }
}
