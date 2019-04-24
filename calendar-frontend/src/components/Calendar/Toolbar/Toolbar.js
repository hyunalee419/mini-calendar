import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'components/common/Button';
import { CALENDAR_TYPE } from 'utils/enums';
import './Toolbar.scss';

export default class Toolbar extends Component {
  static propTypes = {
    type: PropTypes.oneOf([CALENDAR_TYPE.month, CALENDAR_TYPE.week]),
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    onClickPrev: PropTypes.func,
    onClickToday: PropTypes.func,
    onClickNext: PropTypes.func,
    onClickMonth: PropTypes.func,
    onClickWeek: PropTypes.func,
  }

  static defaultProps = {
    type: CALENDAR_TYPE.month,
    onClickPrev: undefined,
    onClickToday: undefined,
    onClickNext: undefined,
    onClickMonth: undefined,
    onClickWeek: undefined,
  }

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  handleClickNav = type => () => {
    const { year, month } = this.props;
    const currDate = new Date(year, month);

    switch (type) {
      case 'prev':
        const { onClickPrev } = this.props;
        if (onClickPrev) {
          currDate.setMonth(currDate.getMonth() - 1);
          onClickPrev(currDate.getFullYear(), currDate.getMonth());
        }
        break;
      case 'today':
        const { onClickToday } = this.props;
        if (onClickToday) {
          const today = new Date();
          onClickToday(today.getFullYear(), today.getMonth());
        }
        break;
      case 'next':
        const { onClickNext } = this.props;
        if (onClickNext) {
          currDate.setMonth(currDate.getMonth() + 1);
          onClickNext(currDate.getFullYear(), currDate.getMonth());
        }
        break;
      default:
        break;
    }
  }

  handleClickCalendarType = type => () => {
    const funcProps = `onClick${type.charAt(0).toUpperCase() + type.slice(1)}`;
    const { [funcProps]: onClickFunc } = this.props;

    if (onClickFunc) onClickFunc(type);
  }

  render() {
    const { type, year, month } = this.props;
    return (
      <div className="mini-calendar-toolbar">
        <span className="btn-group">
          <Button onClick={this.handleClickNav('prev')}>Prev</Button>
          <Button onClick={this.handleClickNav('today')}>Today</Button>
          <Button onClick={this.handleClickNav('next')}>Next</Button>
        </span>
        <span className="toolbar-title">
          {year}년 {month + 1}월
        </span>
        <span className="btn-group">
          <Button
            className={type === CALENDAR_TYPE.month ? 'active' : ''}
            onClick={this.handleClickCalendarType(CALENDAR_TYPE.month)}
          >
            월간
          </Button>
          <Button
            className={type === CALENDAR_TYPE.week ? 'active' : ''}
            onClick={this.handleClickCalendarType(CALENDAR_TYPE.week)}
          >
            주간
          </Button>
        </span>
      </div>
    );
  }
}
