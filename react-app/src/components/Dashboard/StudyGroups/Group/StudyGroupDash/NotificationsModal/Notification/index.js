import { useDispatch } from "react-redux";
import { acceptRequest } from "../../../../../../../store/notifications";
import { getGroup } from "../../../../../../../store/groups";

const Notification = ({ notification }) => {
    const dispatch = useDispatch();

    const handleAccept = async (e) => {
        e.preventDefault();
        const data = await dispatch(acceptRequest(notification.id, notification.group_id, notification.username));
        if (!data) {
            await dispatch(getGroup(notification.group_id))
            const buttons = document.querySelector('.notification-btns');
            buttons.style.display = 'none';
            return;
        }
    }

    return (
        <div className='notification-container'>
            {notification.message}
            <div className='notification-btns'>
                {!notification.seen &&
                <>
                    <button id='accept-request' onClick={handleAccept}>Accept</button>
                    <button id='reject-request'>Reject</button>
                </>
                }
            </div>
        </div>
    )
}

export default Notification;
