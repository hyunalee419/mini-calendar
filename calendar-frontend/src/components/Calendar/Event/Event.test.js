import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'jest-enzyme';
import Event from './Event';

configure({adapter: new Adapter()});
describe('Event Component', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');

    const args = {
      title: '일정',
      start: new Date('2019-04-01 11:23').toISOString(),
      end: new Date('2019-04-01 12:23').toISOString()
    }
    ReactDOM.render(<Event {...args} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Check title year, month index', () => {
    const args = {
      title: '일정',
      start: new Date('2019-04-01 11:23').toISOString(),
      end: new Date('2019-04-01 12:23').toISOString()
    }
    const wrapper = shallow(<Event {...args} />);

    expect(wrapper.find('div.mc-event-content').text()).toBe("11시 일정");
  });
});
