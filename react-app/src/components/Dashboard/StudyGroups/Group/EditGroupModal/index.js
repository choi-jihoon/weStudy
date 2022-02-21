import { useState, useEffect } from "react";

import { Modal } from "../../../../../context/Modal";
import EditGroupForm from "./EditGroupForm";

function EditGroupModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="edit-group"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-edit"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditGroupForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default EditGroupModal;
