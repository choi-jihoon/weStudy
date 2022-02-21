import { useEffect, useState } from "react";
import { Modal } from "../../../../../../../context/Modal";
import DeleteEventForm from "./DeleteEventForm";

function DeleteEventModal({ event }) {
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
				id="delete-event"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-trash"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteEventForm showModal={setShowModal} event={event} />
				</Modal>
			)}
		</>
	);
}

export default DeleteEventModal;
