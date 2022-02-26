import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { createRoom } from "../../../../../../store/rooms";

import './CreateRoomForm.css';

const CreateRoomForm = ({ setShowModal, group }) => {
	const [errors, setErrors] = useState({});
	const [roomName, setRoomName] = useState("");

	const dispatch = useDispatch();

	useEffect(() => {
		const errors = {};
		if (roomName.length > 40)
			errors['room_name'] = 'Room name must be less than 40 characters.';
		setErrors(errors);
	}, [roomName]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const errors = {};
		if (!roomName.length) errors['room_name'] = 'This field is required.';
		if (Object.values(errors).length) return setErrors(errors);

		const data = await dispatch(createRoom(roomName, group.id));

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
		<form onSubmit={handleSubmit} className="form-container" autoComplete="off">
			<div className='form-element-container'>
				<input
					className='add-room-input'
					name="room_name"
					type="text"
					placeholder="Room Name"
					value={roomName}
					onChange={updateRoomName}

				/>
				<div className='errors-container'>
					{errors.room_name ? `${errors.room_name}` : ""}
				</div>
			</div>

			<button disabled={Object.keys(errors).length > 0} id='add-room' type="submit">Create Room</button>
		</form>
	);
};

export default CreateRoomForm;
