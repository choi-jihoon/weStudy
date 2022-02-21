import { useEffect, useState } from "react";
import { Modal } from "../../../../../../context/Modal";
import RemoveFromGroupForm from "./RemoveFromGroupForm";

function RemoveFromGroupModal({ group, user }) {
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
			<div
				id="rm-from-group"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-user-minus"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<RemoveFromGroupForm showModal={setShowModal} group={group} user={user} />
				</Modal>
			)}
		</>
	);
}

export default RemoveFromGroupModal;
