const Notification = ({ notification }) => {
    return (
        <div className='notification-container'>
            {notification.message}
            <div className='notification-btns'>
                <button id='accept-request'>Accept</button>
                <button id='reject-request'>Reject</button>
            </div>
        </div>
    )
}

export default Notification;
