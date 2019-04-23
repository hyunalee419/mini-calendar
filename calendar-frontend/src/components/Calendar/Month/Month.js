import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import Header from 'components/Calendar/Header';
import { EventType } from 'components/Calendar/Event';
import {
  beforeDaysInMonth, daysInMonth, firstDayInMonth,
} from 'utils/dates';
import DayRow from './DayRow';
import Day from './Day';
import './Month.scss';

export default class Month extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired, // month index
    events: PropTypes.arrayOf(PropTypes.shape(EventType)),
    onClickDay: PropTypes.func,
    onClickEvent: PropTypes.func,
    onDropEvent: PropTypes.func,
  }

  static defaultProps = {
    events: null,
    onClickDay: undefined,
    onClickEvent: undefined,
    onDropEvent: undefined,
  }

  filterEvents = () => {
    const { events, year, month } = this.props;
    const start = new Date(year, month - 1, 21);
    const end = new Date(year, month + 1, 7);

    return events && events.filter((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return (start < eventStart && eventStart < end)
        || (end < eventEnd && eventEnd < end);
    });
  }

  renderContents = () => {
    const {
      year, month, onClickDay, onClickEvent, onDropEvent,
    } = this.props;
    const Days = daysInMonth(year, month),
      FirstDay = firstDayInMonth(year, month),
      BeforeDays = beforeDaysInMonth(year, month);

    const events = this.filterEvents();

    const contents = [];
    let day = 1,
      currDate;
    for (let i = 0; day <= Days; i += 7) {
      const cols = [];
      for (let j = i; j < i + 7; j += 1) {
        let date,
          isOff = false;
        if (j === FirstDay || (day > 1 && day <= Days)) {
          date = day;
          day += 1;
          currDate = new Date(year, month, date);
        } else if (day <= 1) {
          date = BeforeDays - FirstDay - (-j) + 1;
          isOff = true;
          currDate = new Date(year, month - 1, date);
        } else {
          date = day - Days;
          day += 1;
          isOff = true;
          currDate = new Date(year, month + 1, date);
        }

        const dayEvents = events && events.filter((event) => {
          const start = new Date(event.start);
          return moment.tz(start, 'Asia/Seoul').format('YYYY-MM-DD') === moment.tz(currDate, 'Asia/Seoul').format('YYYY-MM-DD');
        });
        cols.push(
          <Day
            key={`day-${date}`}
            year={currDate.getFullYear()}
            month={currDate.getMonth()}
            date={date}
            events={dayEvents}
            onClick={onClickDay}
            onClickEvent={onClickEvent}
            onDropEvent={onDropEvent}
            isOff={isOff}
          />,
        );
      }
      contents.push(<DayRow key={`day-row-${i / 7}`}>{cols}</DayRow>);
    }

    return contents;
  }

  render() {
    return (
      <div className="mc-month-view">
        <Header />
        {this.renderContents()}
      </div>
    );
  }
}
