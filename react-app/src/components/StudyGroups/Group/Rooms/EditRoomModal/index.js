import React, { useEffect, useState } from "react";
import { Modal } from '../../../../../context/Modal';
import EditRoomForm from "./EditRoomForm";

function EditRoomModal({ room }) {
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
				id="edit-room"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				Edit Room Name
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditRoomForm showModal={setShowModal} room={room} />
				</Modal>
			)}
		</>
	);
}

export default EditRoomModal;
