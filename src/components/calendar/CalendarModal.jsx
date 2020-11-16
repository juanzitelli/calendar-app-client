import moment from 'moment';
import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { eventClearActiveEvent, startEventAddNew, startEventUpdate } from '../../actions/events';
import { uiCloseModalAction } from '../../actions/ui';

const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'

	}
};

process.env.NODE_ENV !== 'test' && Modal.setAppElement('#root')


const now = moment().minutes(0).second(0).add(1, 'hours');
const nowPlusOneHour = now.clone().add(1, 'hours')


const initEvent = {
	title: "",
	notes: "",
	start: now.toDate(),
	end: nowPlusOneHour.toDate(),
}


export const CalendarModal = () => {

	const [dateStart, setDateStart] = useState(now.toDate())
	const [dateEnd, setDateEnd] = useState(nowPlusOneHour.toDate())
	const [titleValid, setTitleValid] = useState(true)
	const [formValues, setFormValues] = useState(initEvent)


	const dispatch = useDispatch();
	const { modalOpen } = useSelector(state => state.ui)
	const { activeEvent } = useSelector(state => state.calendar)

	const { notes, title, start, end } = formValues

	const handleInputChange = ({ target }) => {
		setFormValues({
			...formValues,
			[target.name]: target.value
		})
	}

	const closeModal = () => {
		dispatch(uiCloseModalAction())
		dispatch(eventClearActiveEvent())
		setFormValues(initEvent)
	}

	const handleStartDateChange = selectedDate => {
		setDateStart(selectedDate);
		setFormValues({
			...formValues,
			start: selectedDate
		})
	}
	const handleEndDateChange = selectedDate => {
		setDateEnd(selectedDate);
		setFormValues({
			...formValues,
			end: selectedDate
		})
	}
	const handleFormSubmit = (event) => {
		event.preventDefault();
		const momentStart = moment(start)
		const momentEnd = moment(end)
		if (momentStart.isSameOrAfter(momentEnd)) {
			return Swal.fire("Error", "End date shouldn't be lower than start date", "error");
		}
		if (title.trim().length < 2) {
			return setTitleValid(false)
		}
		setTitleValid(true);
		if (activeEvent) {
			dispatch(startEventUpdate(formValues))
		}
		else {
			dispatch(startEventAddNew(formValues))
		}
		closeModal();

	}

	useEffect(() => {
		if (activeEvent) {
			setFormValues(activeEvent);
		}
		else {
			setFormValues(initEvent);
		}
	}, [activeEvent])

	return (
		<Modal
			isOpen={modalOpen}
			// onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			closeTimeoutMS={300}
			style={customStyles}
			className='modal'
			overlayClassName='modal-fondo'
			ariaHideApp={!process.env.NODE_ENV === 'test'}

		>
			<h1> {activeEvent ? 'Edit event' : "New event"} </h1>
			<hr />
			<form className="container"
				onSubmit={handleFormSubmit}
			>

				<div className="form-group">
					<label>Start date and time</label>
					<DateTimePicker
						onChange={handleStartDateChange}
						value={dateStart}
						className='form-control'
						name="start"
					/>
				</div>

				<div className="form-group">
					<label>End date and time</label>
					<DateTimePicker
						onChange={handleEndDateChange}
						value={dateEnd}
						minDate={dateStart}
						className='form-control'
						name="end"
					/>
				</div>

				<hr />
				<div className="form-group">
					<label>Title and notes</label>
					<input
						type="text"
						className={`form-control ${!titleValid && 'is-invalid'}`}
						placeholder="Event's title"
						name="title"
						autoComplete="off"
						value={title}
						onChange={handleInputChange}
					/>
					<small id="emailHelp" className="form-text text-muted">A short description</small>
				</div>

				<div className="form-group">
					<textarea
						type="text"
						className="form-control"
						placeholder="Notes"
						rows="5"
						name="notes"
						value={notes}
						onChange={handleInputChange}
					></textarea>
					<small id="emailHelp" className="form-text text-muted">Additional information</small>
				</div>

				<button
					type="submit"
					className="btn btn-outline-primary btn-block"
				>
					<i className="far fa-save"></i>
					<span> Save</span>
				</button>

			</form>
		</Modal>
	)
}


