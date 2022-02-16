import React, { useEffect, useState } from "react";
import { Modal } from '../../../../../../context/Modal';
import DeleteNoteForm from "./DeleteNoteForm";

function DeleteNote({ note }) {
	const [showModal, setShowModal] = useState(false);

	const handleClick = (e) => {
		e.preventDefault();
		e.stopPropagation();
	};

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<button
				id="delete-note"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-trash"></i>
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteNoteForm showModal={setShowModal} note={note} />
				</Modal>
			)}
		</>
	);
}

export default DeleteNote;
