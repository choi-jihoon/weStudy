import { useDispatch } from "react-redux";
import { acceptRequest, rejectRequest } from "../../../../../../../store/notifications";
import { getGroup } from "../../../../../../../store/groups";

const Notification = ({ notification }) => {
    const dispatch = useDispatch();

    const handleAccept = async (e) => {
        e.preventDefault();
        const data = await dispatch(acceptRequest(notification.id, notification.group_id, notification.username));
        if (!data) {
            await dispatch(getGroup(notification.group_id))
            return;
        };
    };

    const handleReject = async (e) => {
        e.preventDefault();
        const data = await dispatch(rejectRequest(notification.id));
        if (!data) {
            await dispatch(getGroup(notification.group_id));
            return;
        };
    };

    return (
        <div className='notification-container'>
            <div className='notification-message'>
                {notification.message}
            </div>
            <div className='notification-btns'>
                {!notification.seen &&
                <>
                    <button id='accept-request' onClick={handleAccept}>Accept</button>
                    <button id='reject-request' onClick={handleReject}>Reject</button>
                </>
                }
            </div>
        </div>
    )
}

export default Notification;
