const LOAD_NOTIFICATIONS = 'notifications/LOAD_NOTIFICATIONS';
const ACCEPT_REQUEST = 'notifications/ACCEPT_REQUEST';
const REJECT_REQUEST = 'notifications/REJECT_REQUEST';

const load = notifications => ({
    type: LOAD_NOTIFICATIONS,
    notifications
});

const accept = data => ({
    type: ACCEPT_REQUEST,
    notification: data.notification,
    group: data.group
});

const reject = notification => ({
    type: REJECT_REQUEST,
    notification
})

export const getNotifications = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/notifications`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(load(data.notifications))
    };
};

export const acceptRequest = (notificationId, group_id, username) => async (dispatch) => {
    const res = await fetch(`/api/notifications/${notificationId}/accept`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_id, username })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(accept(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
}

export const rejectRequest = (notificationId) => async (dispatch) => {
    const res = await fetch(`/api/notifications/${notificationId}/reject`, {
        method: 'PATCH'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(reject(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};

const initialState = {
    notifications: {},
    byGroupId: {}
}

const notifications = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTIFICATIONS: {
            const newState = { ...state };
            const loadNotifications = {};
            action.notifications.forEach(notification => {
                loadNotifications[notification.id] = notification;
            });
            newState.notifications = { ...loadNotifications };
            if (action.notifications.length) {
                newState.byGroupId[action.notifications[0].group_id] =  { ...loadNotifications }
            };
            return newState;
        }

        case ACCEPT_REQUEST: {
            const newState = { ...state };
            newState.notifications[action.notification.id] = action.notification;
            newState.byGroupId[action.notification.group_id] = {
                ...newState.byGroupId[action.notification.group_id],
                [action.notification.id]: action.notification
            }
            return newState;
        }

        case REJECT_REQUEST: {
            const newState = { ...state };
            delete newState.notifications[action.notification.id];
            delete newState.byGroupId[action.notification.group_id][action.notification.id];
            return newState;
        }

        default:
            return state;
    };
};

export default notifications;
