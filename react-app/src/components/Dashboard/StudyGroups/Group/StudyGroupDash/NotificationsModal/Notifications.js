import { useSelector } from 'react-redux';
import Notification from './Notification';

const Notifications = ({ group }) => {

    const notificationsObj = useSelector(state => state.notifications)
    const notifications = Object.values(notificationsObj.byGroupId[group.id])

    return (
        <div className='notifications-container'>
            {notifications.map(notification => {
                return (
                    <Notification key={notification.id} notification={notification} />
                )
            })}
        </div>
    )
}

export default Notifications;
