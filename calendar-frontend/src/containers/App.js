import React, { Component } from 'react';
import axios from 'axios';
import Calendar from 'components/Calendar';
import EventFormModal from 'components/EventFormModal';
import moment from "moment-timezone";

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

  updateStateEvent = (id, data) => {
    const { events } = this.state;
    for (let i = 0; events && i < events.length; i++) {
      if (events[i].id === id) {
        events[i] = {
          id,
          ...data
        };
        break;
      }
    }
    return events;
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

  handleDropEvent = (event, date) => {
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    date = new Date(date - timezoneOffset);

    const yyyymmdd = date.toISOString().slice(0, 10);
    event.start = moment.tz(`${yyyymmdd} ${event.start.slice(11, 16)}`, 'Asia/Seoul').format();
    event.end = moment.tz(`${yyyymmdd} ${event.end.slice(11, 16)}`, 'Asia/Seoul').format();

    try {
      axios.put(`${API_HOST}/events/${event.id}`, event);
      alert("성공적으로 저장되었습니다.");

      const { id, ...data } = event;
      const events = this.updateStateEvent(id, data);
      this.setState({ events: events.slice() });
    } catch (e) {
      alert(e.toString());
    }
  }

  handleCancel = (e) => {
    this.title = this.start = this.end = undefined;

    this.setState({
      isModal: false,
    });
  }

  handleDelete = (event) => {
    this.clickDay = this.event = undefined;

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

  handleSubmit = async (data) => {
    const method = this.event ? 'PUT' : 'POST'
      , id = this.event ? this.event.id : '';
    this.clickDay = this.event = undefined;

    try {
      await axios({
        method,
        url: `${API_HOST}/events${method === 'PUT' ? `/${id}` : ''}`,
        data
      });
      // TODO: change toast
      alert('성공적으로 저장되었습니다.');

      let { events } = this.state;
      if ( method === 'POST' ) {
        events.push(data);
      } else {
        events = this.updateStateEvent(id, data);
      }
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
          onDropEvent={this.handleDropEvent}
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
