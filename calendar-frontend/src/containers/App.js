import React, { Component } from 'react';
import Calendar from 'components/Calendar';

const Mock = [{
  title: '일정',
  start: new Date('2019-03-01 11:23').toISOString(),
  end: new Date('2019-03-01 12:23').toISOString()
}, {
  title: '일정',
  start: new Date('2019-04-01 11:23').toISOString(),
  end: new Date('2019-04-01 12:23').toISOString()
}, {
  title: '일정2',
  start: new Date('2019-04-02 11:23').toISOString(),
  end: new Date('2019-04-01 12:23').toISOString()
}, {
  title: '회의',
  start: new Date('2019-04-02 15:23').toISOString(),
  end: new Date('2019-04-01 17:23').toISOString()
}];

class App extends Component {
  handleClickEvent = (title, start, end) => {
    console.log(title, start, end)
  }

  render() {
    return (
      <Calendar events={Mock} onClickEvent={this.handleClickEvent} />
    );
  }
}

export default App;
