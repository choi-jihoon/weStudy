import { useState, useEffect } from "react";
import { Modal } from "../../../../../../context/Modal";
import AddUserToGroupForm from "./AddUserToGroupForm";

function AddUserToGroupModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="add-user-to-group"

			>
				<i className="fas fa-user-plus"
				onClick={() => setShowModal(true)}></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddUserToGroupForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default AddUserToGroupModal;
