import { useSelector } from 'react-redux';
import EditGroupModal from '../../EditGroupModal';
import Notification from './Notification';

const Notifications = ({ group }) => {

    const notificationsObj = useSelector(state => state.notifications);

    let notifications = [];
    if (notificationsObj.byGroupId[group.id]) {
        notifications = Object.values(notificationsObj.byGroupId[group.id])
    }

    return (
        <div className='notifications-container'>
            {notifications.map(notification => {
                return (
                    <Notification key={notification.id} notification={notification} />
                )
            })}
            {!notifications.length && (
                <div className='notification-container'>
                    You have no new notifications.
                </div>
            )}
        </div>
    )
}

export default Notifications;
