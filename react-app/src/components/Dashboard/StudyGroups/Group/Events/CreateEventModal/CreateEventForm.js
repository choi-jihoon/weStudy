import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createEvent } from "../../../../../../store/events";

import './CreateEventForm.css';

const CreateEventForm = ({ setShowModal, groupId }) => {
	const [errors, setErrors] = useState({});
	const [summary, setSummary] = useState("");
	const [description, setDescription] = useState("");
	const [startTime, setStartTime] = useState("");
	const [endTime, setEndTime] = useState("");

	const user = useSelector(state => state.session.user);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const data = await dispatch(createEvent(
			user.id,
			groupId,
			summary,
			description,
			startTime,
			endTime
		));

		if (data) {
			const errors = {}
			for (let i = 0; i < data.length; i++) {
				const error = data[i].split(": ");
				errors[error[0]] = error[1]
			}
			setErrors(errors);
			return;
		}

		setShowModal(false);
	};

	const handleCancelClick = async (e) => {
		e.preventDefault();
		setShowModal(false);
	};

	const updateSummary = (e) => {
		setSummary(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

	const updateStartTime = (e) => {
		setStartTime(e.target.value);
	};

	const updateEndTime = (e) => {
		setEndTime(e.target.value);
	};

	useEffect(() => {
		setErrors(errors)
	}, [errors]);


	return (
		<form autoComplete="off" onSubmit={handleSubmit} className="form-container event-form-container">
			<div className='event-form-input-container'>
				<div className='form-element-container'>
					<input
						name="summary"
						type="text"
						placeholder="Event Title"
						value={summary}
						onChange={updateSummary}
						required
					/>
					<div className='errors-container'>
						{errors.summary ? `${errors.summary}` : ""}
					</div>
				</div>

				<div className='form-element-container'>
					<input
						name="description"
						type="text"
						placeholder="Event Description"
						value={description}
						onChange={updateDescription}
						required
					/>
					<div className='errors-container'>
						{errors.description ? `${errors.description}` : ""}
					</div>
				</div>

				<div className='form-element-container'>
					<input
						name="start_time"
						type="datetime-local"
						value={startTime}
						onChange={updateStartTime}
						required
					/>
					<div className='errors-container'>
						{errors.start_time ? `${errors.start_time}` : ""}
					</div>
				</div>

				<div className='form-element-container'>
					<input
						name="end_time"
						type="datetime-local"
						value={endTime}
						onChange={updateEndTime}
						required
					/>
					<div className='errors-container'>
						{errors.end_time ? `${errors.end_time}` : ""}
					</div>
				</div>
			</div>
			<div className='event-btns-container'>
				<button id='event-submit' type="submit">Create Event</button>
				<button id='event-submit-cancel' className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
			</div>

		</form>
	);
};

export default CreateEventForm;
