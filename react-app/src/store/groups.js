const LOAD_GROUPS = 'groups/LOAD_GROUPS';
const CREATE_GROUP = 'groups/CREATE_GROUP';
const REMOVE_GROUP = 'groups/REMOVE_GROUP';
const EDIT_GROUP = 'groups/EDIT_GROUP';

const loadGroups = (groups) => ({
    type: LOAD_GROUPS,
    groups
});

const create = (group) => ({
    type: CREATE_GROUP,
    group
})

const remove = (group) => ({
    type: REMOVE_GROUP,
    group
})

const edit = (group) => ({
    type: EDIT_GROUP,
    group
})

export const getGroups = () => async (dispatch) => {
    const res = await fetch(`/api/groups/`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(loadGroups(data.groups));
    }
};

export const createGroup = (group_name, description, owner_id) => async (dispatch) => {
    const res = await fetch(`/api/groups/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_name,
            description,
            owner_id
        })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(create(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return {'ERROR': 'An error occurred. Please try again.'}
    }
}

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
        }
    } else {
        return {'ERROR': 'An error occurred. Please try again.'}
    }

}

export const editGroup = (groupId, group_name, description, owner_id) => async (dispatch) => {
    console.log("HELLO?????????????")
    const res = await fetch(`/api/groups/${groupId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_name,
            description,
            owner_id
        })
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(edit(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return {'ERROR': 'An error occurred. Please try again.'}
    }
}


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
            }
        }

        case CREATE_GROUP: {
            const newState = { ...state };
            newState[action.group.id] = action.group
            return newState;
        }

        case REMOVE_GROUP: {
            const newState = { ...state };
            delete newState[action.group.id];
            return newState;
        }

        case EDIT_GROUP: {
            const newState = { ...state };
            newState[action.group.id] = action.group;
            return newState;
        }

        default:
            return state;
    }
}

export default groups;
