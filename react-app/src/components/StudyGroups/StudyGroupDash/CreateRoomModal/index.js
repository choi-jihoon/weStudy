import React, { useState, useEffect } from "react";
import { Modal } from "../../../../context/Modal";
import CreateRoomForm from "./CreateRoomForm";

function CreateRoomModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<button
				id="create-room"
				onClick={() => setShowModal(true)}
			>
				Create a Room
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateRoomForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default CreateRoomModal;