import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import DayRow from './DayRow/DayRow';
import Day from './Day';
import { EventType } from '../Event';
import './Month.scss';
import {
  beforeDaysInMonth, daysInMonth, firstDayInMonth
} from '../../../utils/dates';

export default class Month extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired, // month index
    events: PropTypes.arrayOf(PropTypes.shape(EventType)),
    onClickEvent: PropTypes.func
  }

  filterEvents = () => {
    const { events, year, month } = this.props;
    const start = new Date(year, month-1, 21)
      , end = new Date(year, month+1, 7);

    return events && events.filter((event) => {
      const eventStart = new Date(event.start)
        , eventEnd = new Date(event.end);
      return (start < eventStart && eventStart < end)
        || (end < eventEnd && eventEnd < end)
    });
  }

  renderContents = () => {
    const { year, month, onClickEvent } = this.props;
    const Days = daysInMonth(year, month)
      , FirstDay = firstDayInMonth(year, month)
      , BeforeDays = beforeDaysInMonth(year, month);

    const events = this.filterEvents();

    const _contents = [];
    let day = 1
      , currDate;
    for (let i = 0; day < Days; i += 7) {
      const _cols = [];
      for (let j = i; j < i + 7; j++) {
        let date
          , isOff = false;
        if (j === FirstDay || (day > 1 && day <= Days)) {
          date = day;
          day++;
          currDate = new Date(year, month, date + 1);
        } else if (day <= 1) {
          date = BeforeDays - FirstDay - (-j) + 1;
          isOff = true;
          currDate = new Date(year, month - 1, date + 1);
        } else {
          date = day - Days;
          day++;
          isOff = true;
          currDate = new Date(year, month + 1, date + 1);
        }

        const dayEvents = events && events.filter((event) => {
          const start = new Date(event.start);
          return start.toISOString().slice(0, 10) === currDate.toISOString().slice(0, 10);
        });
        _cols.push(<Day key={`day-${date}`} year={currDate.getFullYear()} month={currDate.getMonth()} date={date} events={dayEvents} onClickEvent={onClickEvent} isOff={isOff} />)
      }
      _contents.push(<DayRow key={`day-row-${i/7}`}>{_cols}</DayRow>);
    }

    return _contents;
  }

  render() {
    return (
      <div className="mc-month-view">
        <Header />
        {this.renderContents()}
      </div>
    )
  }
}
