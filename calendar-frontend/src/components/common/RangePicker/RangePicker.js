import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DatePicker from '../DatePicker';
import './RangePicker.scss';

export default class RangePicker extends Component {
  static propTypes = {
    startValue: PropTypes.string,
    startDefaultValue: PropTypes.string,
    endValue: PropTypes.string,
    onChange: PropTypes.func,
    endDefaultValue: PropTypes.string,
    startProps: PropTypes.any,
    endProps: PropTypes.any,
    className: PropTypes.string,
    style: PropTypes.any
  }

  static defaultProps = {
    startValue: undefined,
    startDefaultValue: undefined,
    endValue: undefined,
    endDefaultValue: undefined,
    className: '',
    style: undefined
  }

  startValue;
  endValue;

  constructor(props) {
    super(props);

    const startValue = props.startDefaultValue ? props.startDefaultValue : ''
      , endValue = props.endDefaultValue ? props.endDefaultValue : '';

    this.state = { startValue, endValue };

    this.startValue = startValue || props.startValue;
    this.endValue = endValue || props.endValue;
  }

  handleChange = (type) => (e) => {
    const { onChange, startDefaultValue, endDefaultValue } = this.props;
    const { value } = e.target;

    this[`${type}Value`] = value;
    switch (type) {
      case 'start':
        if ( this.endValue && value > this.endValue ) {
          this.endValue = this.startValue;
        } else {
          this.startValue = value;
        }
        break;
      case 'end':
        if ( this.startValue && value < this.startValue ) {
          this.startValue = this.endValue;
        } else {
          this.endValue = value;
        }
        break;
    }

    if ( onChange ) {
      onChange(this.startValue, this.endValue);
    }
    if ( startDefaultValue || endDefaultValue ) {
      this.setState({ startValue: this.startValue, endValue: this.endValue });
    }
  }

  render() {
    const {
      startValue, endValue, startDefaultValue, endDefaultValue,
      startProps, endProps, className, style
    } = this.props;
    const { startValue: stateStartValue, endValue: stateEndValue } = this.state;

    return (
      <div className={`mc-rangepicker ${className}`} style={style}>
        <DatePicker
          value={ (startDefaultValue || !startValue) ? stateStartValue: startValue }
          onChange={this.handleChange('start')}
          {...startProps}
        />
        <DatePicker
          value={ (endDefaultValue || !endValue) ? stateEndValue : endValue }
          onChange={this.handleChange('end')}
          {...endProps}
        />
      </div>
    )
  }
}
