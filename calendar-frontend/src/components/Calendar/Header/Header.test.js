import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import Header from './Header';

configure({adapter: new Adapter()});
describe('Header Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    const today = new Date();
    ReactDOM.render(<Header year={today.getFullYear()} month={today.getMonth()} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Check title year, month index', () => {
    const wrapper = shallow(<Header year={2019} month={4}/>);

    const title = <span className="header-title">2019년 5월</span>

    expect(wrapper.contains(title)).toBe(true);
  });
});