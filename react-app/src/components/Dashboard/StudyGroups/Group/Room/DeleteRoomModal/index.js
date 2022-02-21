import { useEffect, useState } from "react";
import { Modal } from "../../../../../../context/Modal";
import DeleteRoomForm from "./DeleteRoomForm";

function DeleteRoomModal({ room }) {
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
				id="delete-room"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-trash"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteRoomForm showModal={setShowModal} room={room} />
				</Modal>
			)}
		</>
	);
}

export default DeleteRoomModal;
