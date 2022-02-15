const LOAD_ROOMS = 'rooms/LOAD_ROOMS';
const LOAD_ROOM = 'rooms/LOAD_ROOM';

const loadRooms = (rooms) => ({
    type: LOAD_ROOMS,
    rooms
})

const loadRoom = (room) => ({
    type: LOAD_ROOM,
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

        default:
            return state;
    }
}

export default rooms;
