import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { editGroup } from "../../../store/groups";

import "./EditGroupForm.css";

const EditGroupForm = ({ setShowModal, group }) => {
	const [errors, setErrors] = useState({});
	const [groupName, setGroupName] = useState(group.group_name);
	const [description, setDescription] = useState(group.description);
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const user = useSelector(state => state.session.user)

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('group_name', groupName);
		formData.append('description', description);
		formData.append('owner_id', user.id);
		if (image) {
			formData.append('group_image', image);
			setImageLoading(true);
		}

		const data = await dispatch(editGroup(formData, group.id));
		setImageLoading(false);

		if (data) {
			const errors = {}
			for (let i = 0; i < data.length; i++) {
				const error = data[i].split(": ");
				errors[error[0]] = error[1]
			}
			setErrors(errors);
			setImageLoading(false);
			return;
		}
		setShowModal(false);
	};

	const handleCancelClick = async (e) => {
		e.preventDefault();
		setShowModal(false);
	};

	// const handleSubmit = async (e) => {
	// 	e.preventDefault();
	// 	const data = await dispatch(editGroup(group.id, groupName, description, user.id));

	// 	if (data) {
	// 		const errors = {}
	// 		for (let i = 0; i < data.length; i++) {
	// 			const error = data[i].split(": ");
	// 			errors[error[0]] = error[1]
	// 		}
	// 		setErrors(errors)
	// 		return;
	// 	}
	// 	setShowModal(false);
	// };

	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
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
		<form autoComplete="off" onSubmit={handleSubmit} className="group-form-container">
			{/* <div className="modal-head">Edit Study Group</div> */}
			<div className='group-form-input-container'>
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
				<button id='create-group' type="submit">Edit Group</button>
				<button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
			</div>

			<div className="gf-add-image-container">
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={updateImage}
				></input>
				<div className="preview-container group">
					{!image && (
						<img
						alt="preview"
						src={group.group_image}
						className="preview-image group"
					></img>
					)}
					{image && (
						<img
							alt="preview"
							src={URL.createObjectURL(image)}
							className="preview-image group"
						></img>
					)}
				</div>
				<label htmlFor="file-upload">
					{imageLoading ?
						<i className="fas fa-spinner fa-pulse"></i>
						:
						<i className="fas fa-image"></i>
					}
				</label>
			</div>
		</form>
	);
};

export default EditGroupForm;
