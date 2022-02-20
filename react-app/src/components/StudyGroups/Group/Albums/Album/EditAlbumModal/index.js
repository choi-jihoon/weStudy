import { useEffect, useState } from "react";
import { Modal } from "../../../../../../context/Modal";
import EditAlbumForm from "./EditAlbumForm";

function EditAlbumModal({ album }) {
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
					<EditAlbumForm setShowModal={setShowModal} album={album} />
				</Modal>
			)}
		</>
	);
}

export default EditAlbumModal;
