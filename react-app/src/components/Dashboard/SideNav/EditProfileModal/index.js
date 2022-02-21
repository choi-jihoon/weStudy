import { useState } from "react";
import { Modal } from "../../../../context/Modal";

import EditProfile from "./EditProfile";

function EditProfileModal () {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div
				id="edit-user"
				onClick={() => setShowModal(true)}
				style={{
					zIndex: 100,
				}}
				className="edit-user-pic-btn"
			>
				<i className="fas fa-edit"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditProfile showModal={setShowModal} />
				</Modal>
			)}
		</>
	);
}

export default EditProfileModal;
