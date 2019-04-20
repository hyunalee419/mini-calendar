import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import DayRow from './DayRow/DayRow';
import Day from './Day';
import {
  beforeDaysInMonth, daysInMonth, firstDayInMonth
} from '../../../utils/dates';

export default class Month extends Component {
  static propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired, // month index
  }

  render() {
    const { year, month } = this.props;
    const Days = daysInMonth(year, month)
      , FirstDay = firstDayInMonth(year, month)
      , BeforeDays = beforeDaysInMonth(year, month);


    const _contents = [];
    let day = 1;
    for (let i = 0; day < Days; i += 7) {
      const _cols = [];
      for (let j = i; j < i + 7; j++) {
        let date
          , isOff = false;
        if (j === FirstDay || (day > 1 && day <= Days)) {
          date = day;
          day++;
        } else if (day <= 1) {
          date = BeforeDays - FirstDay - (-j) + 1;
          isOff = true;
        } else {
          date = day - Days;
          day++;
          isOff = true;
        }
        _cols.push(<Day date={date} isOff={isOff} />)
      }
      _contents.push(<DayRow>{_cols}</DayRow>);
    }
    return (
      <div>
        <Header />
        {_contents}
      </div>
    )
  }
}
