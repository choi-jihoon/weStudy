const LOAD_NOTIFICATIONS = 'notifications/LOAD_NOTIFICATIONS';

const load = notifications => ({
    type: LOAD_NOTIFICATIONS,
    notifications
});

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

        default:
            return state;
    }
}

export default notifications;
