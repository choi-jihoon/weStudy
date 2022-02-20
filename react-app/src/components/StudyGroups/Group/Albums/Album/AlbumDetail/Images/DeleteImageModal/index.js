import { useEffect, useState } from "react";
import { Modal } from '../../../../../../../../context/Modal';
import DeleteImageForm from "./DeleteImageForm";

function DeleteImageModal({ image }) {
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
				id="delete-image"
				onClick={(e) => {
					setShowModal(true);
					handleClick(e);
				}}
			>
				<i className="fas fa-trash"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteImageForm showModal={setShowModal} image={image} />
				</Modal>
			)}
		</>
	);
}

export default DeleteImageModal;
