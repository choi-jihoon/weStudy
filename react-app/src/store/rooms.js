const LOAD_ROOMS = 'rooms/LOAD_ROOMS';
const LOAD_ROOM = 'rooms/LOAD_ROOM';
const CREATE_ROOM = 'rooms/CREATE_ROOM';

const loadRooms = (rooms) => ({
    type: LOAD_ROOMS,
    rooms
})

const loadRoom = (room) => ({
    type: LOAD_ROOM,
    room
})

const create = (room) => ({
    type: CREATE_ROOM,
    room
})

export const getRooms = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/rooms`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(loadRooms(data.rooms))
    }
}

export const getRoom = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(loadRoom(data));
    }
}

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
    })

    if (res.ok) {
        const data = await res.json();
        dispatch(create(data.room));
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

const rooms = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ROOMS: {
            const loadRooms = {};
            action.rooms.forEach(room => {
                loadRooms[room.id] = room;
            });
            return {
                ...loadRooms
            }
        }

        case LOAD_ROOM: {
            const newState = { ...state };
            newState[action.room.id] = action.room;
            return newState;
        }

        case CREATE_ROOM: {
            const newState = { ...state };
            newState[action.room.id] = action.room;
            return newState;
        }

        default:
            return state;
    }
}

export default rooms;
