import React, { useEffect, useState } from "react";
import { Modal } from '../../../context/Modal';
import DeleteGroupForm from "./DeleteGroupForm";

function DeleteGroupModal({ group }) {
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
				id="delete-group"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-trash"></i>
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteGroupForm showModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default DeleteGroupModal;
