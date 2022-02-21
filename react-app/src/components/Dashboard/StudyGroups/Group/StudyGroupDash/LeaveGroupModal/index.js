import { useEffect, useState } from "react";

import { Modal } from "../../../../../../context/Modal";
import LeaveGroupForm from "./LeaveGroupForm";

function LeaveGroupModal({ group }) {
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
				id="leave-group"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-sign-out-alt"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<LeaveGroupForm showModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default LeaveGroupModal;
