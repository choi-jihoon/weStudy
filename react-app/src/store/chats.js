const LOAD_CHATS = 'chats/LOAD_CHATS';
const CREATE_CHAT = 'chats/CREATE_CHAT';

const load = (chats) => ({
    type: LOAD_CHATS,
    chats
});

const create = (chat) => ({
    type: CREATE_CHAT,
    chat
});

const remove = (chat) => ({
    type: REMOVE_CHAT,
    chat
})

export const getChatMessages = (roomId) => async (dispatch) => {
    const res = await fetch(`/api/rooms/${roomId}/chats`)

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(load(data.chats))
    }
}

export const createChatMessage = (room_id, message) => async (dispatch) => {
    const res = await fetch(`/api/chats/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            room_id,
            message
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

export const deleteChatMessage = (chatId) => async (dispatch) => {
    const res = await fetch(`/api/chats/${chatId}`, {
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
        return {'ERROR': 'An error occurred. Please try again.'}
    }
}

const initialState = {};

const chats = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CHATS: {
            const loadChats = {};
            action.chats.forEach(chat => {
                loadChats[chat.id] = chat;
            });
            return {
                ...loadChats
            }
        }

        case CREATE_CHAT: {
            const newState = { ...state };
            newState[action.chat.id] = action.chat;
            return newState;
        }

        case REMOVE_CHAT: {
            const newState = { ...state };
            delete newState[action.chat.id];
            return newState;
        }

        default:
            return state;
    }
}

export default chats;
