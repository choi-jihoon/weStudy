import { useState, useEffect } from "react";
import { Modal } from "../../../../../../context/Modal";

import CreateNoteForm from "./CreateNoteForm";

function CreateNoteModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="create-note"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-plus"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateNoteForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default CreateNoteModal;
