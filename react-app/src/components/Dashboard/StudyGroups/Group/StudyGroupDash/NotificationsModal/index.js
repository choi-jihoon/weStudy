import { useState, useEffect } from "react";
import { Modal } from "../../../../../../context/Modal";

import Notifications from "./Notifications";

function NotificationsModal() {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="add-user-to-group"
				onClick={() => setShowModal(true)}
			>
				<i className="fa-solid fa-bell"></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<Notifications />
				</Modal>
			)}
		</>
	);
}

export default NotificationsModal;
