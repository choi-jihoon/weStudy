const LOAD_ROOMS = 'rooms/LOAD_ROOMS';

const loadRooms = (rooms) => ({
    type: LOAD_ROOMS,
    rooms
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

        default:
            return state;
    }
}

export default rooms;
