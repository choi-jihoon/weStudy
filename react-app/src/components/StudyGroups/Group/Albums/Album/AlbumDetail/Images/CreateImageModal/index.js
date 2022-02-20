import { useState, useEffect } from "react";
import { Modal } from "../../../../../../../../context/Modal";
import CreateImageForm from "./CreateImageForm";

function CreateImageModal({ albumId }) {
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
				<i className="fas fa-cloud-upload-alt"></i>
			</li>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateImageForm setShowModal={setShowModal} albumId={albumId} />
				</Modal>
			)}
		</>
	);
}

export default CreateImageModal;
