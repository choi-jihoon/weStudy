import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { createAlbum } from "../../../../../../store/albums";

const CreateAlbumForm = ({ setShowModal, group }) => {
	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState("");

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(createAlbum(group.id, title));

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
		<form onSubmit={handleSubmit} className="form-container">
			<div className='form-element-container'>
				<input
					className='add-title-input'
					name="title"
					type="text"
					placeholder="Album Title"
					value={title}
					onChange={updateTitle}
					required
				/>
				<div className='errors-container'>
					{errors.title ? `${errors.title}` : ""}
				</div>
			</div>

			<button id='add-room' type="submit">Create Album</button>
		</form>
	);
};

export default CreateAlbumForm;
