import React, { useState, useEffect } from "react";
import { Modal } from "../../../../../../context/Modal";
import CreateEventForm from "./CreateEventForm";

function CreateEventModal({ groupId }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<li className='create-event'
				id="create-event"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-plus"></i>
			</li>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateEventForm setShowModal={setShowModal} groupId={groupId} />
				</Modal>
			)}
		</>
	);
}

export default CreateEventModal;
