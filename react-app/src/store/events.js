const LOAD_EVENTS = 'events/LOAD_EVENTS';
const CREATE_EVENT = 'events/CREATE_EVENT';

const load = events => ({
    type: LOAD_EVENTS,
    events
});

const create = event => ({
    type: CREATE_EVENT,
    event
});

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
                newState.byGroupId[action.events[0].group_id] = { ... loadEvents }
            };
            return newState;
        }

        case CREATE_EVENT: {
            const newState = { ...state };
            newState.events[action.event.id] = action.event;
            newState.byGroupId[action.event.group_id] = {
                ...newState.byGroupId[action.event.group_id],
                [action.event.id]: action.event
            }
            return newState;
        }

        default:
            return state;
    }
}
