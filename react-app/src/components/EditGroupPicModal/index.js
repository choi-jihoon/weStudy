// import { useState } from "react";
// import { Modal } from "../../../../context/Modal";
// import EditGroupPicForm from "./EditGroupPicForm";

// function EditGroupPicModal ({ group }) {
// 	const [showModal, setShowModal] = useState(false);

// 	return (
// 		<>
// 			<div
// 				id="edit-group-pic"
// 				onClick={() => setShowModal(true)}
// 				style={{
// 					zIndex: 100,
// 				}}
// 				className="edit-user-pic-btn"
// 			>
// 				<i className="fas fa-edit"></i>
// 			</div>
// 			{showModal && (
// 				<Modal onClose={() => setShowModal(false)}>
// 					<EditGroupPicForm showModal={setShowModal} group={group} />
// 				</Modal>
// 			)}
// 		</>
// 	);
// }

// export default EditGroupPicModal;
