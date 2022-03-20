const LOAD_GROUPS = 'groups/LOAD_GROUPS';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const REMOVE_GROUP = 'groups/REMOVE_GROUP';
const EDIT_GROUP = 'groups/EDIT_GROUP';
const ADD_TO_GROUP = 'groups/ADD_TO_GROUP';
const LOAD_GROUP = 'groups/LOAD_GROUP';
const LEAVE_GROUP = 'groups/LEAVE_GROUP';
const REMOVE_FROM_GROUP = 'groups/REMOVE_FROM_GROUP';
const REQUEST_TO_JOIN = 'groups/REQUEST_TO_JOIN';

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
});

const create = (group) => ({
    type: CREATE_GROUP,
    group
});

const remove = (group) => ({
    type: REMOVE_GROUP,
    group
});

const edit = (group) => ({
    type: EDIT_GROUP,
    group
});

const addToGroup = (group) => ({
    type: ADD_TO_GROUP,
    group
});

const loadGroup = (group) => ({
    type: LOAD_GROUP,
    group
});

const leaveGroup = (group) => ({
    type: LEAVE_GROUP,
    group
});

const removeFromGroup = (group) => ({
    type: REMOVE_FROM_GROUP,
    group
});

const requestToJoin = (group) => ({
    type: REQUEST_TO_JOIN,
    group
})

export const getGroups = () => async (dispatch) => {
    const res = await fetch(`/api/groups/`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        dispatch(loadGroups(data.groups));
    };
};

export const getGroup = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return data;
        };
        dispatch(loadGroup(data));
    };
};

export const createGroup = (formData) => async (dispatch) => {
    const res = await fetch(`/api/groups/`, {
        method: 'POST',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(create(data));
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

export const deleteGroup = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(remove(data));
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

export const editGroup = (formData, groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        body: formData,
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(edit(data));
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

export const addUserToGroup = (groupId, username) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/add`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_id: groupId, username })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(addToGroup(data));
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

export const requestToJoinGroup = (user_id, group_name) => async (dispatch) => {
    const res = await fetch(`/api/groups/join`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_id, group_name })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(requestToJoin(data));
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

export const leaveStudyGroup = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/leave`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ group_id: groupId })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(leaveGroup(data));
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

export const removeUserFromGroup = (groupId, userId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/remove/${userId}`, {
        method: 'PATCH'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(removeFromGroup(data));
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

const updateSingleGroup = (state, action) => {
    const newState = { ...state };
    newState[action.group.id] = action.group
    return newState;
};

const initialState = {};

const groups = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_GROUPS: {
            const loadGroups = {};
            action.groups.forEach(group => {
                loadGroups[group.id] = group;
            });
            return {
                ...loadGroups
            };
        }

        case REMOVE_GROUP: {
            const newState = { ...state };
            delete newState[action.group.id];
            return newState;
        }

        case REQUEST_TO_JOIN: {
            return state;
        }

        case LOAD_GROUP:
        case CREATE_GROUP:
        case EDIT_GROUP:
        case ADD_TO_GROUP:
        case REMOVE_FROM_GROUP:
        case LEAVE_GROUP: {
            return updateSingleGroup(state, action);
        }

        default:
            return state;
    };
};

export default groups;
