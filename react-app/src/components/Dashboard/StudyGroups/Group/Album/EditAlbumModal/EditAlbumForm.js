import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { editAlbum } from "../../../../../../store/albums";

const EditAlbumForm = ({ setShowModal, album }) => {
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState(album.title);

	const dispatch = useDispatch();

	useEffect(() => {
		const errors = {};
		if (title.length > 40)
			errors['title'] = 'Album title must be less than 40 characters.';
		setErrors(errors);
	}, [title]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!title.length) errors['title'] = 'This field is required.';
		if (Object.values(errors).length) return setErrors(errors);

		const data = await dispatch(editAlbum(album.id, album.group_id, title));

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

	const updateTitle = (e) => {
		setTitle(e.target.value);
	};

	useEffect(() => {
		setErrors(errors);
	}, [errors]);


	return (
		<form onSubmit={handleSubmit} className="form-container" autoComplete="off">
			<div className='form-element-container'>
				<input
					className='add-title-input'
					name="title"
					type="text"
					placeholder="Album Title"
					value={title}
					onChange={updateTitle}

				/>
				<div className='errors-container'>
					{errors.title ? `${errors.title}` : ""}
				</div>
			</div>

			<button disabled={Object.keys(errors).length > 0} id='edit-room-submit' type="submit">Edit Album Title</button>
		</form>
	);
};

export default EditAlbumForm;
