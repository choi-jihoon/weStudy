import React, { useState, useEffect } from "react";
import { Modal } from "../../../context/Modal";
import AddUserToGroupForm from "./AddUserToGroupForm";

function AddUserToGroupModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<button
				id="add-user-to-group"
				onClick={() => setShowModal(true)}
			>
				Add User to Group
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<AddUserToGroupForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default AddUserToGroupModal;
