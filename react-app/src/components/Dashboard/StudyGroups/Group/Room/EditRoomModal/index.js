import { useEffect, useState } from "react";
import { Modal } from "../../../../../../context/Modal";
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
			<div
				id="edit-room"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-edit"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditRoomForm setShowModal={setShowModal} room={room} />
				</Modal>
			)}
		</>
	);
}

export default EditRoomModal;
