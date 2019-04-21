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

  handleClickEvent = ({ id, title, start, end }) => {
    this.event = {
      id, title, start, end
    }
    this.setState({ isModal: true });
  }

  handleCancel = (e) => {
    this.title = this.start = this.end = undefined;

    this.setState({
      isModal: false,
    });
  }

  handleDelete = (event) => {
    try {
      axios.delete(`${API_HOST}/events/${event.id}`);
      // TODO: change toast
      alert('성공적으로 삭제되었습니다.');

      const { events } = this.state;
      this.setState({
        isModal: false,
        events: events.filter((item) => item.id !== event.id)
      })
    } catch (e) {
      alert(e.toString())
    }
  }

  handleSubmit = async (values) => {
    this.clickDay = this.event = undefined;

    try {
      await axios.post(`${API_HOST}/events`, values);
      // TODO: change toast
      alert('성공적으로 저장되었습니다.');

      const { events } = this.state;
      events.push(values);
      this.setState({ isModal: false, events: events.slice() });
    } catch (e) {
      alert(e.toString());
    }
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
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit}
          />
        )}
      </>
    );
  }
}

export default App;
