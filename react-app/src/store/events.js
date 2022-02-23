const LOAD_EVENTS = 'events/LOAD_EVENTS';
const CREATE_EVENT = 'events/CREATE_EVENT';
const DELETE_EVENT = 'events/DELETE_EVENT';
const EDIT_EVENT = 'events/EDIT_EVENT';
const JOIN_EVENT = 'events/JOIN_EVENT';
const LEAVE_EVENT = 'events/LEAVE_EVENT';

const load = events => ({
    type: LOAD_EVENTS,
    events
});

const create = event => ({
    type: CREATE_EVENT,
    event
});

const remove = event => ({
    type: DELETE_EVENT,
    event
});

const edit = event => ({
    type: EDIT_EVENT,
    event
})

const join = event => ({
    type: JOIN_EVENT,
    event
})

const bail = event => ({
    type: LEAVE_EVENT,
    event
})


export const getEvents = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/events`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(load(data.events))
    }
}

export const createEvent = (user_id, group_id, summary, description, start_time, end_time) => async (dispatch) => {
    const res = await fetch(`/api/events/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            group_id,
            summary,
            description,
            start_time,
            end_time
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
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

export const deleteEvent = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE'
    })

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
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

export const editEvent = (eventId, user_id, group_id, summary, description, start_time, end_time) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            group_id,
            summary,
            description,
            start_time,
            end_time
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
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

export const joinEvent = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}`, {
        method: 'PATCH'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(join(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

export const leaveEvent = (eventId) => async (dispatch) => {
    const res = await fetch(`/api/events/${eventId}/bail`, {
        method: 'PATCH'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(bail(data));
        return null;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

const updateSingleEvent = (state, action) => {
    const newState = { ...state };
    newState.events[action.event.id] = action.event;
    newState.byGroupId[action.event.group_id] = {
        ...newState.byGroupId[action.event.group_id],
        [action.event.id]: action.event
    }
    return newState;
}

const initialState = {
    events: {},
    byGroupId: {}
}

const events = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_EVENTS: {
            const newState = { ...state };
            const loadEvents = {};
            action.events.forEach(event => {
                loadEvents[event.id] = event;
            });
            newState.events = { ...loadEvents };
            if (action.events.length) {
                newState.byGroupId[action.events[0].group_id] = { ...loadEvents }
            };
            return newState;
        }

        case DELETE_EVENT: {
            const newState = { ...state };
            delete newState.events[action.event.id];
            delete newState.byGroupId[action.event.group_id][action.event.id];
            return newState;
        }

        case CREATE_EVENT:
        case EDIT_EVENT:
        case JOIN_EVENT:
        case LEAVE_EVENT: {
            return updateSingleEvent(state, action);
        }

        default:
            return state;
    }
}


export default events;
