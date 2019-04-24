import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment-timezone';
import Calendar from 'components/Calendar';
import EventFormModal from 'components/EventFormModal';

const API_HOST = 'http://localhost:8000';

class App extends Component {
  state = {
    events: null,
    isModal: false,
    event: null,
    isEdit: false,
    clickDay: null,
  }

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

  updateStateEvent = (data) => {
    const { events } = this.state;
    for (let i = 0; events && i < events.length; i += 1) {
      if (events[i].id === data.id) {
        events[i] = { ...data };
        break;
      }
    }
    return events;
  };

  handleClickDay = (date) => {
    this.setState({
      isModal: true,
      clickDay: date,
    });
  }

  handleClickEvent = async ({ id }) => {
    this.setState({ isModal: true, isEdit: true });
    try {
      const response = await axios.get(`${API_HOST}/events/${id}`);
      const { data: event } = response;
      this.setState({ event });
    } catch (e) {
      alert(e.toString());
    }
  }

  handleDropEvent = (dropEvent, dropDate) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const date = new Date(dropDate - timezoneOffset);

    const event = { ...dropEvent };
    const yyyymmdd = date.toISOString().slice(0, 10);
    event.start = moment.tz(`${yyyymmdd} ${event.start.slice(11, 16)}`, 'Asia/Seoul').format();
    event.end = moment.tz(`${yyyymmdd} ${event.end.slice(11, 16)}`, 'Asia/Seoul').format();

    try {
      axios.put(`${API_HOST}/events/${event.id}`, event);
      alert('성공적으로 저장되었습니다.');

      const events = this.updateStateEvent(event);
      this.setState({ events: events ? [...events] : null });
    } catch (e) {
      alert(e.toString());
    }
  }

  handleCancel = () => {
    this.setState({
      isModal: false,
      event: null,
      isEdit: false,
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
        events: events.filter(item => item.id !== event.id),
        event: null,
        isEdit: false,
        clickDay: null,
      });
    } catch (e) {
      alert(e.toString());
    }
  }

  handleSubmit = async (data) => {
    const { event } = this.state;
    const method = event ? 'PUT' : 'POST',
      id = event ? event.id : '';

    try {
      const response = await axios({
        method,
        url: `${API_HOST}/events${method === 'PUT' ? `/${id}` : ''}`,
        data,
      });
      // TODO: change toast
      alert('성공적으로 저장되었습니다.');

      const { data: newEvent } = response;
      let { events } = this.state;
      if (method === 'POST') {
        events.push(newEvent);
      } else {
        events = this.updateStateEvent(newEvent);
      }
      this.setState({
        isModal: false,
        events: events ? [...events] : null,
        event: null,
        isEdit: false,
      });
    } catch (e) {
      alert(e.toString());
    }
  }

  render() {
    const {
      events, isModal, event, clickDay, isEdit,
    } = this.state;
    return (
      <>
        <Calendar
          events={events}
          onClickDay={this.handleClickDay}
          onClickEvent={this.handleClickEvent}
          onDropEvent={this.handleDropEvent}
        />

        { isModal && (
          <EventFormModal
            isOpen={isModal}
            event={event}
            date={clickDay}
            onClose={this.handleCancel}
            onDelete={this.handleDelete}
            onSubmit={this.handleSubmit}
            isEdit={isEdit}
          />
        )}
      </>
    );
  }
}

export default App;
