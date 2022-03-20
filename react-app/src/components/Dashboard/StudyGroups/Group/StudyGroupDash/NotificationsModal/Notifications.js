import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Notifications = ({ group }) => {

    const notificationsObj = useSelector(state => state.notifications)
    console.log(notificationsObj)
    const notifications = Object.values(notificationsObj.byGroupId[group.id])

    return (
        <>
            {notifications.map(notification => {
                return (
                    <>
                        {notification.message}
                    </>
                )
            })}
        </>
    )
}

export default Notifications;
