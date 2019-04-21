import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import DateTime from 'react-datetime';
import Button from 'components/common/Button';
import { EventType } from "../Calendar/Event";
import 'react-datetime/css/react-datetime.css';
import './EventFormModal.scss';

export default class EventFormModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    event: PropTypes.shape(EventType),
    date: PropTypes.objectOf(Date),
    onClose: PropTypes.func,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    isOpen: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { title, start, end } = e.target;

    title = title.value;
    start = start.value;
    end = end.value;

    const { onSubmit } = this.props;
    if (onSubmit) onSubmit({ title, start, end });
  }

  render() {
    const { isOpen, event, date, onClose } = this.props;

    const contentLabel = event && event.title ? '일정 수정' : '일정 등록';

    let start, end;
    if (event) {
      start = new Date(event.start);
      end = new Date(event.end);
    } else {
      start = date ? date : new Date();
      end = date ? new Date(date.getTime()) : new Date();
      end.setHours(end.getHours() + 1);
    }

    return (
      <Modal
        className="mc-event-modal"
        // overlayClassName="mc-event-modal-overlay"
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel={contentLabel}
      >
        <h3>{ contentLabel }</h3>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor="title">제목</label>
            <input id="title" defaultValue={ event ? event.title: '' } name="title" required />
          </div>
          <div>
            <DateTime
              defaultValue={ start }
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              inputProps={{
                name: 'start',
                required: true
              }}
            />
            <DateTime
              defaultValue={ end }
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              inputProps={{
                name: 'end',
                required: true
              }}
            />
          </div>
          <div className="btn-group">
            <Button onClick={onClose}>close</Button>
            <Button className="ml-5" type="submit">ok</Button>
          </div>
        </form>
      </Modal>
    )
  }
}

Modal.setAppElement('#root');
