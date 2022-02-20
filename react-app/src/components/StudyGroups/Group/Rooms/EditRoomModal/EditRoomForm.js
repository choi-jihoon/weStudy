import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { editRoom } from "../../../../../store/rooms";

const EditRoomForm = ({ setShowModal, room }) => {
	const [errors, setErrors] = useState({});
	const [roomName, setRoomName] = useState(room.room_name);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(editRoom(room.id, roomName));

		if (data) {
			const errors = {}
			for (let i = 0; i < data.length; i++) {
				const error = data[i].split(": ");
				errors[error[0]] = error[1]
			}
			setErrors(errors)
			return;
		}
        setShowModal(false);
	};


	const updateRoomName = (e) => {
		setRoomName(e.target.value);
	};

	useEffect(() => {
		setErrors(errors);
	}, [errors]);


	return (
		<form onSubmit={handleSubmit} className="form-container">
			{/* <div className="modal-head">Edit Room Name</div> */}
			<div className='form-element-container'>
				<input
					name="room_name"
					type="text"
					placeholder="Room Name"
					value={roomName}
					onChange={updateRoomName}
					required
				/>
				<div className='errors-container'>
					{errors.room_name ? `${errors.room_name}` : ""}
				</div>
			</div>

			<button id='edit-room-submit' type="submit">Edit Room Name</button>
		</form>
	);
};

export default EditRoomForm;
