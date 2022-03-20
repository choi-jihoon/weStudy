import { useState, useEffect } from "react";
import { Modal } from "../../../../context/Modal";
import AddUserToGroupForm from "./AddUserToGroupForm";

function JoinGroupModal() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="add-user-to-group"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-user-plus"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddUserToGroupForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}

export default JoinGroupModal;
