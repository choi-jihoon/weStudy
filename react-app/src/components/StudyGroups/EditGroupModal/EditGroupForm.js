import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editGroup } from "../../../store/groups";

import "./EditGroupForm.css";

const EditGroupForm = ({ setShowModal, group }) => {
	const [errors, setErrors] = useState({});
	const [groupName, setGroupName] = useState(group.group_name);
	const [description, setDescription] = useState(group.description);
    const user = useSelector(state => state.session.user)

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(editGroup(group.id, groupName, description, user.id));

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


	const updateGroupName = (e) => {
		setGroupName(e.target.value);
	};

	const updateDescription = (e) => {
		setDescription(e.target.value);
	};

	useEffect(() => {
		setErrors(errors)
	}, [errors])


	return (
		<form onSubmit={handleSubmit} className="form-container">
			<div className="modal-head">Create a Study Group</div>
			<div className='form-element-container'>
				<input
					name="group_name"
					type="text"
					placeholder="Study Group Name"
					value={groupName}
					onChange={updateGroupName}
					required
				/>
				<div className='errors-container'>
					{errors.group_name ? `${errors.group_name}` : ""}
				</div>
			</div>

			<div className='form-element-container'>
				<input
					name="description"
					type="text"
					placeholder="Description"
					value={description}
					onChange={updateDescription}
					required
				/>
				<div className='errors-container'>
					{errors.description ? `${errors.description}` : ""}
				</div>
			</div>
			<button type="submit">Edit Group</button>
		</form>
	);
};

export default EditGroupForm;
