import { useState, useEffect } from "react";
import { Modal } from "../../../../../../context/Modal";

import Notifications from "./Notifications";

function NotificationsModal({ group }) {
	const [showModal, setShowModal] = useState(false);

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="add-user-to-group"

			>
				<i className="fa-solid fa-bell"
                onClick={() => setShowModal(true)}></i>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<Notifications group={group} />
				</Modal>
			)}
		</>
	);
}

export default NotificationsModal;
