import { useState, useEffect } from "react";
import { Modal } from "../../../../context/Modal";
import CreateGroupForm from "./CreateGroupForm";

function CreateGroupModal() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<li className='create-study-group'
				// id="create-group"
				onClick={() => setShowModal(true)}
			>
				Create a Study Group <i className="fas fa-plus"></i>
			</li>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CreateGroupForm setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}

export default CreateGroupModal;
