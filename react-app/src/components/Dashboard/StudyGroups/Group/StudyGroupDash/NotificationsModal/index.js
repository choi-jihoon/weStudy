import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Modal } from "../../../../../../context/Modal";

import Notifications from "./Notifications";

import './NotificationsModal.css';

function NotificationsModal({ group }) {
	const [showModal, setShowModal] = useState(false);
    console.log(group.notifications)

    const isNewNotifications = (notifications) => {
        if (notifications) {
            for (let i = 0; i < notifications.length; i++) {
                if (!(notifications[i].seen)) {
                    return true;
                }
            }
            return false;
        }
        return false;
    }

	useEffect(() => {
		return () => setShowModal(false);
	}, []);

	return (
		<>
			<div
				id="add-user-to-group"

			>
				<i className={isNewNotifications(group.notifications) ? "fa-solid fa-bell new-notifications" : "fa-solid fa-bell"}
                onClick={() => setShowModal(true)}
                ></i>
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
