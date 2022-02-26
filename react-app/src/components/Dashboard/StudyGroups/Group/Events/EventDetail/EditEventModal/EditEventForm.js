import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editEvent } from "../../../../../../../store/events";

const EditEventForm = ({ setShowModal, event }) => {
	const [errors, setErrors] = useState({});
	const [summary, setSummary] = useState(event.summary);
	const [description, setDescription] = useState(event.description);
    const [startTime, setStartTime] = useState((new Date(event.start_time).toISOString()).slice(0,16));
    const [endTime, setEndTime] = useState((new Date(event.end_time).toISOString()).slice(0,16));

	const user = useSelector(state => state.session.user);

	const dispatch = useDispatch();

	useEffect(() => {
		const errors = {};
		if (summary.length > 50)
			errors['summary'] = 'Event title must be less than 50 characters.';
		if (description.length > 255)
			errors['description'] = 'Event description must be less than 255 characters.'
		setErrors(errors);
	}, [summary, description]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!summary.length) errors['summary'] = 'This field is required.';
		if (!description.length) errors['description'] = 'This field is required.';
		if (!startTime.length) errors['start_time'] = 'This field is required.';
		if (!endTime.length) errors['end_time'] = 'This field is required.';
		if (Object.values(errors).length) return setErrors(errors);

		const data = await dispatch(editEvent(
            event.id,
            user.id,
            event.group_id,
            summary,
            description,
            startTime.slice(0,16),
			endTime.slice(0,16)
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
		setErrors({});
    };

    const updateEndTime = (e) => {
        setEndTime(e.target.value);
		setErrors({});
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

						format="yyyy-MM-ddTHH:mm"
						placeholder='Start Time: yyyy-MM-ddTHH:mm'
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
						format="yyyy-MM-ddTHH:mm"
						placeholder='End Time: yyyy-MM-ddTHH:mm'
                    />
                    <div className='errors-container'>
						{errors.end_time ? `${errors.end_time}` : ""}
					</div>
                </div>

				<div className='event-btns-container'>
				<button disabled={Object.keys(errors).length > 0} id='event-submit' type="submit">Save</button>
				<button id='event-submit-cancel' className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
			</div>
			</div>

		</form>
	);
};

export default EditEventForm;
