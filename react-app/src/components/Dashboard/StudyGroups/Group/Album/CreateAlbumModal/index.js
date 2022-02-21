import { useState, useEffect } from "react";
import { Modal } from "../../../../../../context/Modal";
import CreateAlbumForm from "./CreateAlbumForm";

function CreateAlbumModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="create-album"
				onClick={() => setShowModal(true)}
			>
				<i className="fas fa-plus"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateAlbumForm setShowModal={setShowModal} group={group} />
				</Modal>
			)}
		</>
	);
}

export default CreateAlbumModal;
