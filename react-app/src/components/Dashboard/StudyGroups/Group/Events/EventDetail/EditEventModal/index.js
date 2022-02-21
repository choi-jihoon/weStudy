import { useState, useEffect } from "react";
import { Modal } from "../../../../../../../context/Modal";
import EditEventForm from "./EditEventForm";

function EditEventModal({ event }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<li className='edit-event'
				id="edit-event"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-edit edit-event-icon"></i>
			</li>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditEventForm setShowModal={setShowModal} event={event} />
				</Modal>
			)}
		</>
	);
}

export default EditEventModal;
