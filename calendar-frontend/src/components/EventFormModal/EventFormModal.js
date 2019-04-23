import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Modal from 'react-modal';
import { Button, Input, RangePicker } from 'components/common';
import { EventType } from 'components/Calendar/Event';
import './EventFormModal.scss';

export default class EventFormModal extends Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    event: PropTypes.shape(EventType),
    date: PropTypes.objectOf(Date),
    onClose: PropTypes.func,
    onDelete: PropTypes.func,
    onSubmit: PropTypes.func,
    isEdit: PropTypes.bool,
  }

  static defaultProps = {
    isOpen: false,
    event: null,
    date: null,
    onClose: undefined,
    onDelete: undefined,
    onSubmit: undefined,
    isEdit: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    let { title } = e.target;
    const {
      startDate, startTime, endDate, endTime,
    } = e.target;

    title = title.value;
    const start = `${startDate.value} ${startTime.value}`;
    const end = `${endDate.value} ${endTime.value}`;

    const { onSubmit } = this.props;
    if (onSubmit) onSubmit({ title, start, end });
  }

  handleDelete = (e) => {
    e.preventDefault();

    const { event, onDelete } = this.props;
    if (onDelete) onDelete(event);
  }

  render() {
    const {
      isOpen, event, date, onClose, isEdit,
    } = this.props;

    const contentLabel = event && event.title ? '일정 수정' : '일정 등록';

    let start, end;
    if (event) {
      start = new Date(event.start);
      end = new Date(event.end);
    } else {
      start = new Date();
      end = new Date();
      end.setHours(end.getHours() + 1);

      if (date) {
        start.setFullYear(date.getFullYear());
        start.setMonth(date.getMonth());
        start.setDate(date.getDate());
        end.setFullYear(date.getFullYear());
        end.setMonth(date.getMonth());
        end.setDate(date.getDate());
      }
    }

    return (
      <Modal
        className="mc-event-modal"
        isOpen={isOpen}
        onRequestClose={onClose}
        contentLabel={contentLabel}
      >
        <h3>{contentLabel}</h3>
        <hr />

        {(!isEdit || (isEdit && event)) && (
          <form onSubmit={this.handleSubmit}>
            <div className="mc-event-modal-title mb-10">
              <Input
                defaultValue={event ? event.title : ''}
                placeholder="일정 제목을 입력하세요."
                name="title"
                required
              />
            </div>

            <div>
              <RangePicker
                startDefaultValue={moment(start).format('YYYY-MM-DD')}
                startProps={{
                  placeholder: 'YYYY-MM-dd',
                  name: 'startDate',
                  required: true,
                }}
                startTimeDefaultValue={moment(start).format('HH:mm')}
                startTimeProps={{
                  placeholder: 'HH:mm',
                  name: 'startTime',
                  required: true,
                }}
                endDefaultValue={moment(end).format('YYYY-MM-DD')}
                endProps={{
                  placeholder: 'YYYY-MM-dd',
                  name: 'endDate',
                  required: true,
                }}
                endTimeDefaultValue={moment(end).format('HH:mm')}
                endTimeProps={{
                  placeholder: 'HH:mm',
                  name: 'endTime',
                  required: true,
                }}
                isTime
                isSameDate
              />
            </div>
            <div className="btn-group">
              {event && <Button buttonType="danger" onClick={this.handleDelete}>삭제</Button>}

              <Button onClick={onClose}>취소</Button>
              <Button className="ml-5" buttonType="primary" type="submit">저장</Button>
            </div>
          </form>
        )}
      </Modal>
    );
  }
}

Modal.setAppElement('#root');
