import React, { Component } from 'react';
import Toolbar from './Toolbar';
import Month from './Month';
import { CALENDAR_TYPE } from '../../utils/enums';

export default class Calendar extends Component {
  state = {
    type: CALENDAR_TYPE.month,
    year: 2019,
    month: 3 // index (real, month: 4)
  }

  handleChangeNav = (year, month) => {
    this.setState({ year, month });
  }

  handleChangeCalendarType = (type) => {
    this.setState({ type });
  }

  render() {
    const { type, year, month } = this.state;
    return (
      <div>
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
            <Month year={year} month={month} />
          ) : null
        }
      </div>
    )
  }
}
