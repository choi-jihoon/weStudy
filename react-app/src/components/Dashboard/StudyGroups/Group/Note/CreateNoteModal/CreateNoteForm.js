import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createNote } from "../../../../../../store/notes";

const CreateNoteForm = ({ setShowModal, group }) => {
	const dispatch = useDispatch();
    const history = useHistory();

	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState("");

	const user = useSelector(state => state.session.user);

	useEffect(() => {
		const errors = {};
		if (title.length > 40)
			errors['note_title'] = 'Note title must be less than 40 characters.';
		setErrors(errors);
	}, [title]);


	const handleSubmit = async (e) => {
		e.preventDefault();

		const errors = {};
		if (!title.length) errors['note_title'] = 'This field is required.';
		if (Object.values(errors).length) return setErrors(errors);

		const data = await dispatch(createNote(user.id, group.id, title));

		if (data.errors) {
			const errors = {}
			for (let i = 0; i < data.errors.length; i++) {
				const error = data.errors[i].split(": ");
				errors[error[0]] = error[1]
			}
			setErrors(errors)
			return;
		}

        setShowModal(false);
        history.push(`/groups/${group.id}/notes/${data}`)
	};


	const updateTitle = (e) => {
		setTitle(e.target.value);
	};

	useEffect(() => {
		setErrors(errors)
	}, [errors])


	return (
		<form autoComplete="off" onSubmit={handleSubmit} className="form-container">
			<div className='form-element-container'>
				<input
					name="note_title"
					type="text"
					placeholder="Title"
					value={title}
					onChange={updateTitle}

				/>
				<div className='errors-container'>
					{errors.note_title ? `${errors.note_title}` : ""}
				</div>
			</div>
			<button disabled={Object.keys(errors).length > 0} id='create-note-submit' type="submit">New Note</button>
		</form>
	);
};

export default CreateNoteForm;
