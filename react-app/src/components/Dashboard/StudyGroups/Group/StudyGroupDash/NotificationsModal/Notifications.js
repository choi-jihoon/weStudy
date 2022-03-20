import { useSelector } from 'react-redux';
import Notification from './Notification';

const Notifications = ({ group }) => {

    const notificationsObj = useSelector(state => state.notifications);

    let notifications = [];
    if (notificationsObj.byGroupId[group.id]) {
        notifications = Object.values(notificationsObj.byGroupId[group.id]).filter(notification => !notification.seen)
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
                    There are no new notifications.
                </div>
            )}
        </div>
    )
}

export default Notifications;
