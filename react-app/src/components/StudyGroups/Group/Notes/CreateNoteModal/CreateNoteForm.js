import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { createNote } from "../../../../../store/notes";

const CreateNoteForm = ({ setShowModal, group }) => {
	const dispatch = useDispatch();
    const history = useHistory();

	const [errors, setErrors] = useState({});
	const [title, setTitle] = useState("");

	const user = useSelector(state => state.session.user);


	const handleSubmit = async (e) => {
		e.preventDefault();
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
		<form onSubmit={handleSubmit} className="form-container">
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
			<button id='create-note-submit' type="submit">New Note</button>
		</form>
	);
};

export default CreateNoteForm;
