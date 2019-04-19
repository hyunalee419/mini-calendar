import React, { Component } from 'react';
import Header from './Header/Header';
import { CALENDAR_TYPE } from "../../modules/enums";

export default class Calendar extends Component {
  state = {
    type: CALENDAR_TYPE.month,
    year: 2019,
    month: 4 // index
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
        <Header
          type={type}
          year={year}
          month={month}
          onClickPrev={this.handleChangeNav}
          onClickToday={this.handleChangeNav}
          onClickNext={this.handleChangeNav}
          onClickMonth={this.handleChangeCalendarType}
          onClickWeek={this.handleChangeCalendarType}
        />
        <div>calendar {type}</div>
      </div>
    )
  }
}
