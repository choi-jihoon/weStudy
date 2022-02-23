const LOAD_ALBUMS = 'albums/LOAD_ALBUMS';
const LOAD_ALBUM = 'albums/LOAD_ALBUM';
const ADD_ALBUM = 'albums/ADD_ALBUM';
const EDIT_ALBUM = 'albums/EDIT_ALBUM';
const DELETE_ALBUM = 'albums/DELETE_ALBUM';

const load = albums => ({
    type: LOAD_ALBUMS,
    albums
});

const loadAlbum = album => ({
    type: LOAD_ALBUM,
    album
})

const create = album => ({
    type: ADD_ALBUM,
    album
})

const edit = album => ({
    type: EDIT_ALBUM,
    album
})

const remove = album => ({
    type: DELETE_ALBUM,
    album
})

export const getAlbums = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/albums`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(load(data.albums))
    }
}

export const getAlbum = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(loadAlbum(data))
    }

}

export const createAlbum = (group_id, title) => async (dispatch) => {
    const res = await fetch(`/api/albums/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_id,
            title
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
        }
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

export const editAlbum = (albumId, group_id, title) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            group_id,
            title
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
        }
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

export const deleteAlbum = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}`, {
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
        return { 'ERROR': 'An error occurred. Please try again.' }
    }
}

const updateSingleAlbum = (state, action) => {
    const newState = { ...state };
    newState.albums[action.album.id] = action.album;
    newState.byGroupId[action.album.group_id] = {
        ...newState.byGroupId[action.album.group_id],
        [action.album.id]: action.album
    }
    return newState;
}

const initialState = {
    albums: {},
    byGroupId: {}
}

const albums = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALBUMS: {
            const newState = { ...state };
            const loadAlbums = {};
            action.albums.forEach(album => {
                loadAlbums[album.id] = album;
            });
            newState.albums = { ...loadAlbums };
            if (action.albums.length) {
                newState.byGroupId[action.albums[0].group_id] = { ...loadAlbums }
            };
            return newState;
        }

        case LOAD_ALBUM:
        case ADD_ALBUM:
        case EDIT_ALBUM: {
            return updateSingleAlbum(state, action);
        }

        case DELETE_ALBUM: {
            const newState = { ...state };
            delete newState.albums[action.album.id];
            delete newState.byGroupId[action.album.group_id][action.album.id];
            return newState;
        }

        default:
            return state;
    }
}

export default albums;
