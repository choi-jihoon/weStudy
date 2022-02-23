const LOAD_IMAGES = 'images/LOAD_IMAGES';
const CREATE_IMAGE = 'images/CREATE_IMAGE';
const DELETE_IMAGE = 'images/DELETE_IMAGE';

const load = images => ({
    type: LOAD_IMAGES,
    images
});

const create = image => ({
    type: CREATE_IMAGE,
    image
});

const remove = image => ({
    type: DELETE_IMAGE,
    image
});

export const getImages = (albumId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/images`);

    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        dispatch(load(data.images))
    };
};

export const createImage = (formData) => async (dispatch) => {
    const res = await fetch(`/api/images/`, {
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

export const deleteImage = (imageId) => async (dispatch) => {
    const res = await fetch(`/api/images/${imageId}`, {
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
        return {'ERROR': 'An error occurred. Please try again.'}
    };
};


const initialState = {
    images: {},
    byAlbumId: {}
}

const images = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_IMAGES: {
            const newState = { ...state };
            const loadImages = {};
            action.images.forEach(image => {
                loadImages[image.id] = image;
            });
            newState.images = { ...loadImages };
            if (action.images.length) {
                newState.byAlbumId[action.images[0].album_id] = { ...loadImages }
            };
            return newState;
        }

        case CREATE_IMAGE: {
            const newState = { ...state };
            newState.images[action.image.id] = action.image;
            newState.byAlbumId[action.image.album_id] = {
                ...newState.byAlbumId[action.image.album_id],
                [action.image.id]: action.image
            };
            return newState;
        }

        case DELETE_IMAGE: {
            const newState = { ...state };
            delete newState.images[action.image.id];
            delete newState.byAlbumId[action.image.album_id][action.image.id];
            return newState;
        }

        default:
            return state;
    }
}

export default images;
