import React from 'react';
import ReactDOM from 'react-dom';
import TimePicker from './TimePicker';

it('renders without crashing', () => {
  const timepicker = document.createElement('input');
  ReactDOM.render(<TimePicker />, timepicker);
  ReactDOM.unmountComponentAtNode(timepicker);
});
