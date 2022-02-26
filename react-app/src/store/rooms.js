const LOAD_ROOMS = 'rooms/LOAD_ROOMS';
const LOAD_ROOM = 'rooms/LOAD_ROOM';
const CREATE_ROOM = 'rooms/CREATE_ROOM';
const DELETE_ROOM = 'rooms/DELETE_ROOM';
const EDIT_ROOM = 'rooms/EDIT_ROOM';
const JOIN_ROOM = 'rooms/JOIN_ROOM';
const LEAVE_ROOM = 'rooms/LEAVE_ROOM';

const loadRooms = (rooms) => ({
    type: LOAD_ROOMS,
    rooms
});

const loadRoom = (room) => ({
    type: LOAD_ROOM,
    room
});

const create = (room) => ({
    type: CREATE_ROOM,
    room
});

const remove = (room) => ({
    type: DELETE_ROOM,
    room
});

const edit = (room) => ({
    type: EDIT_ROOM,
    room
});

const joinRoom = (room) => ({
    type: JOIN_ROOM,
    room
});

const leaveRoom = (room) => ({
    type: LEAVE_ROOM,
    room
})

export const getRooms = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/rooms`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        dispatch(loadRooms(data.rooms))
    };
};

export const getRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        dispatch(loadRoom(data));
    };
};

export const createRoom = (room_name, group_id) => async (dispatch) => {
    const res = await fetch(`/api/rooms/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_name,
            group_id
        })
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

export const deleteRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}`, {
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
};

export const editRoom = (roomId, room_name) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_name
        })
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

export const joinChatRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}/join`, {
        method: 'PATCH'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(joinRoom(data));
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

export const leaveChatRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}/leave`, {
        method: 'PATCH'
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(leaveRoom(data));
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

const updateSingleRoom = (state, action) => {
    const newState = { ...state };
    newState.rooms[action.room.id] = action.room;
    newState.byGroupId[action.room.group_id] = {
        ...newState.byGroupId[action.room.group_id],
        [action.room.id]: action.room
    }
    return newState;
};

const initialState = {
    rooms: {},
    byGroupId: {}
};

const rooms = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ROOMS: {
            const newState = { ...state }
            const loadRooms = {};
            action.rooms.forEach(room => {
                loadRooms[room.id] = room;
            });
            newState.rooms = { ...loadRooms };
            if (action.rooms.length) {
                newState.byGroupId[action.rooms[0].group_id] = { ...loadRooms }
            }
            return newState;
        }

        case DELETE_ROOM: {
            const newState = { ...state };
            delete newState.rooms[action.room.id];
            delete newState.byGroupId[action.room.group_id][action.room.id];
            return newState;
        }

        case LOAD_ROOM:
        case CREATE_ROOM:
        case EDIT_ROOM:
        case JOIN_ROOM:
        case LEAVE_ROOM: {
            return updateSingleRoom(state, action);
        }

        default:
            return state;
    };
};

export default rooms;
