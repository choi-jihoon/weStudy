import { useState, useEffect } from "react";
import { Modal } from "../../../../context/Modal";
import JoinGroupForm from "./JoinGroupForm";

function JoinGroupModal() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<li className='create-study-group'
				onClick={() => setShowModal(true)}
			>
				Join a Group<i className="fa-solid fa-magnifying-glass"></i>
			</li>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<JoinGroupForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}

export default JoinGroupModal;
