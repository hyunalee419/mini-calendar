import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RangePicker from './RangePicker';
import DatePicker from '../DatePicker';
import 'jest-enzyme';

configure({adapter: new Adapter()});
describe('RangePicker Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    ReactDOM.render(<RangePicker />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('check input count', () => {
    const wrapper = shallow(<RangePicker />);

    expect(wrapper.find(DatePicker).length).toBe(2);
  });
});
