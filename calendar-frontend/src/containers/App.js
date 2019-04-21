import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'components/Calendar';
import EventFormModal from 'components/EventFormModal';

const API_HOST = 'http://localhost:8000';

class App extends Component {
  state = {
    events: undefined,
    isModal: false
  }

  event = undefined;
  clickDay = undefined;

  componentDidMount() {
    this.getEvents();
  }

  getEvents = async () => {
    try {
      const response = await axios.get(`${API_HOST}/events`);

      const { data } = response;
      this.setState({ events: data });
    } catch (e) {
      alert(e);
    }
  }

  handleClickDay = (year, month, date) => {
    this.clickDay = new Date(year, month, date);
    this.setState({ isModal: true });
  }

  handleClickEvent = (title, start, end) => {
    this.event = {
      title, start, end
    }
    this.setState({ isModal: true });
  }

  handleCancel = (e) => {
    this.title = this.start = this.end = undefined;

    this.setState({
      isModal: false,
    });
  }

  handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${API_HOST}/events`, values);
      console.log(response);
    } catch (e) {
      alert(e.toString());
    }
    this.setState({ isModal: false });
    this.getEvents(); // todo: insert item list
    this.clickDay = this.event = undefined;
  }

  render() {
    const { events, isModal } = this.state;
    return (
      <>
        <Calendar
          events={events}
          onClickDay={this.handleClickDay}
          onClickEvent={this.handleClickEvent}
        />

        { isModal && (
          <EventFormModal
            isOpen={isModal}
            event={this.event}
            date={this.clickDay}
            onClose={this.handleCancel}
            onSubmit={this.handleSubmit}
          />
        )}
      </>
    );
  }
}

export default App;
