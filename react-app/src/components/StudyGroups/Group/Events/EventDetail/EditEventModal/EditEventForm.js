import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editEvent } from "../../../../../../store/events";

const EditEventForm = ({ setShowModal, event }) => {
	const [errors, setErrors] = useState({});
	const [summary, setSummary] = useState(event.summary);
	const [description, setDescription] = useState(event.description);
    const [startTime, setStartTime] = useState((new Date(event.start_time).toISOString()).slice(0,16));
    const [endTime, setEndTime] = useState((new Date(event.end_time).toISOString()).slice(0,16));

	const user = useSelector(state => state.session.user);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		console.log('starttime', startTime)
		console.log('endtime', endTime)

		const data = await dispatch(editEvent(
            event.id,
            user.id,
            event.group_id,
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

				<div className='event-btns-container'>
				<button id='event-submit' type="submit">Save</button>
				<button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
			</div>
			</div>

		</form>
	);
};

export default EditEventForm;
