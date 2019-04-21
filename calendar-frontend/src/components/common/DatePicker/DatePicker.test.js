import React from 'react';
import ReactDOM from 'react-dom';
import DatePicker from './DatePicker';

it('renders without crashing', () => {
  const datepicker = document.createElement('input');
  ReactDOM.render(<DatePicker />, datepicker);
  ReactDOM.unmountComponentAtNode(datepicker);
});
