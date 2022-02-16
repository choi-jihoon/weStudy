import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { createNote } from "../../../../../store/notes";

const CreateNoteForm = ({ setShowModal, group }) => {

	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState("");

	const user = useSelector(state => state.session.user);

	const dispatch = useDispatch();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const data = await dispatch(createNote(user.id, group.id, title));

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

	// const updateText = (e) => {
	// 	setNoteText(e.target.value);
	// };

	useEffect(() => {
		setErrors(errors)
	}, [errors])


	return (
		<form onSubmit={handleSubmit} className="form-container">
			<div className="modal-head">Create Notes</div>
			<div className='form-element-container'>
				<input
					name="note_title"
					type="text"
					placeholder="Title"
					value={title}
					onChange={updateTitle}
					required
				/>
				<div className='errors-container'>
					{errors.group_name ? `${errors.group_name}` : ""}
				</div>
			</div>

			{/* <div className='form-element-container'>
                <textarea
                    name='note_text'
                    value={noteText}
                    onChange={updateText} />
				<div className='errors-container'>
					{errors.note_text ? `${errors.note_text}` : ""}
				</div>
			</div> */}
			<button type="submit">Create</button>
		</form>
	);
};

export default CreateNoteForm;
