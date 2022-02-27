import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import { updateUserImage } from "../../../../store/session";
import { getGroup } from "../../../../store/groups";
import { getRoom } from "../../../../store/rooms";

import './EditProfile.css';

const EditProfile = ({ showModal }) => {
	const location = useLocation();
	const dispatch = useDispatch();
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);
	const [errors, setErrors] = useState([]);
	const sessionUser = useSelector((state) => state.session.user);

	const path = location.pathname;
	const groupId = path.split('/')[2]
	const roomId = path.split('/')[4]

	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const onSubmit = async (e) => {
		e.preventDefault();

		setImageLoading(true);
		const formData = new FormData();
		formData.append("image", image);
		const data = await dispatch(updateUserImage(formData, sessionUser.id));

		if (!data) {
			setTimeout(() => {
				setImageLoading(false);
				showModal(false);

				if (groupId) dispatch(getGroup(groupId));
				if (roomId) dispatch(getRoom(roomId));

			}, 400);
		} else {
			setErrors(data.errors);
		}
	};


	return (
		<div className="edit-image-form">
			{!image && (
				<img
					src={sessionUser.image}
					alt="test"
				></img>
			)}
			{image && (
				<img
					src={URL.createObjectURL(image)}
					alt="test"
				></img>
			)}
			<form onSubmit={onSubmit}>
				<label htmlFor="file-upload">Upload an Image</label>
				<input
					id="file-upload"
					type="file"
					accept="image/*"
					onChange={updateImage}
				></input>
				<button id="save-prof-pic"
				>Save</button>
			</form>
			{imageLoading && (
				<p>
					<i className="fas fa-spinner fa-pulse"></i>
				</p>
			)}
			{errors.map((err, i) => (
				<li key={i}>{err}</li>
			))}
		</div>
	);
};

export default EditProfile;
