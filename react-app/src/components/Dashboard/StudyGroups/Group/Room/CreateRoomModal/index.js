import { useState, useEffect } from "react";

import { Modal } from "../../../../../../context/Modal";
import CreateRoomForm from "./CreateRoomForm";

function CreateRoomModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="create-room"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-plus"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateRoomForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default CreateRoomModal;
