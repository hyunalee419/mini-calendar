import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StylePropType from 'react-style-proptype';
import moment from 'moment';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import './RangePicker.scss';

export default class RangePicker extends Component {
  static propTypes = {
    startValue: PropTypes.string,
    startDefaultValue: PropTypes.string,
    endValue: PropTypes.string,
    endDefaultValue: PropTypes.string,
    onChange: PropTypes.func,
    startProps: PropTypes.any,
    endProps: PropTypes.any,
    className: PropTypes.string,
    style: StylePropType,

    isTime: PropTypes.bool,
    startTimeValue: PropTypes.string,
    startTimeDefaultValue: PropTypes.string,
    endTimeValue: PropTypes.string,
    endTimeDefaultValue: PropTypes.string,
    startTimeProps: PropTypes.any,
    endTimeProps: PropTypes.any,

    isSameDate: PropTypes.bool,
  }

  static defaultProps = {
    startValue: undefined,
    startDefaultValue: undefined,
    endValue: undefined,
    endDefaultValue: undefined,
    onChange: undefined,
    startProps: undefined,
    endProps: undefined,
    className: '',
    style: undefined,

    isTime: false,
    startTimeValue: undefined,
    startTimeDefaultValue: undefined,
    endTimeValue: undefined,
    endTimeDefaultValue: undefined,
    startTimeProps: undefined,
    endTimeProps: undefined,
    isSameDate: false,
  }

  constructor(props) {
    super(props);

    const startValue = props.startDefaultValue ? props.startDefaultValue : '',
      endValue = props.endDefaultValue ? props.endDefaultValue : '',
      startTimeValue = props.startTimeDefaultValue ? props.startTimeDefaultValue : '',
      endTimeValue = props.endTimeDefaultValue ? props.endTimeDefaultValue : '';

    this.state = {
      startValue, endValue, startTimeValue, endTimeValue,
    };

    this.startValue = startValue || props.startValue;
    this.endValue = endValue || props.endValue;
    this.startTimeValue = startTimeValue || props.startTimeValue;
    this.endTimeValue = endTimeValue || props.endTimeDefaultValue;
  }

  handleChange = type => (e) => {
    const {
      onChange, startDefaultValue, endDefaultValue, startTimeDefaultValue, endTimeDefaultValue,
      isSameDate,
    } = this.props;
    const { value } = e.target;

    if (!value) {
      this[`${type}Value`] = moment(this[`${type}Value`]).subtract(2, 'd').format('YYYY-MM-DD');
    } else {
      this[`${type}Value`] = value;
    }

    if (isSameDate) {
      this.endValue = this.startValue;
    }

    const start = `${this.startValue} ${this.startTimeValue}`,
      end = `${this.endValue} ${this.endTimeValue}`;

    switch (type) {
      case 'start':
      case 'startTime':
        if (end && start >= end) {
          this.endValue = this.startValue;
          this.endTimeValue = this.startTimeValue;
        } else {
          this.startValue = start.slice(0, 10);
          this.startTimeValue = start.slice(11);
        }
        break;
      case 'end':
      case 'endTime':
        if (start && end <= start) {
          this.startValue = this.endValue;
          this.startTimeValue = this.endTimeValue;
        } else {
          this.endValue = end.slice(0, 10);
          this.endTimeValue = end.slice(11);
        }
        break;
      default:
        break;
    }

    if (onChange) {
      onChange(this.startValue, this.endValue);
    }
    if (startDefaultValue || endDefaultValue || startTimeDefaultValue || endTimeDefaultValue) {
      this.setState({
        startValue: this.startValue,
        endValue: this.endValue,
        startTimeValue: this.startTimeValue,
        endTimeValue: this.endTimeValue,
      });
    }
  }

  render() {
    const {
      startValue, endValue, startDefaultValue, endDefaultValue,
      startProps, endProps,
      startTimeValue, endTimeValue, startTimeDefaultValue, endTimeDefaultValue,
      startTimeProps, endTimeProps,
      className, style, isTime, isSameDate,
    } = this.props;
    const {
      startValue: stateStartValue,
      endValue: stateEndValue,
      startTimeValue: stateStartTimeValue,
      endTimeValue: stateEndTimeValue,
    } = this.state;

    return (
      <div className={`mc-rangepicker ${className}`} style={style}>
        <DatePicker
          value={(startDefaultValue || !startValue) ? stateStartValue : startValue}
          onChange={this.handleChange('start')}
          {...startProps}
        />
        { isTime && (
          <TimePicker
            value={
              (startTimeDefaultValue || !startTimeValue) ? stateStartTimeValue : startTimeValue
            }
            onChange={this.handleChange('startTime')}
            {...startTimeProps}
          />
        )}
        <DatePicker
          value={(endDefaultValue || !endValue) ? stateEndValue : endValue}
          onChange={this.handleChange('end')}
          disabled={isSameDate}
          {...endProps}
        />
        { isTime && (
          <TimePicker
            value={(endTimeDefaultValue || !endTimeValue) ? stateEndTimeValue : endTimeValue}
            onChange={this.handleChange('endTime')}
            {...endTimeProps}
          />
        )}
      </div>
    );
  }
}
