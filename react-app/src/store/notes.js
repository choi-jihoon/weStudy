const LOAD_NOTES = 'notes/LOAD_NOTES';
const CREATE_NOTE = 'notes/CREATE_NOTE';
const LOAD_NOTE = 'notes/LOAD_NOTE';
const EDIT_NOTE = 'notes/EDIT_NOTE';
const DELETE_NOTE = 'notes/DELETE_NOTE';

const loadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes
});

const create = (note) => ({
    type: CREATE_NOTE,
    note
});

const loadNote = (note) => ({
    type: LOAD_NOTE,
    note
});

const edit = (note) => ({
    type: EDIT_NOTE,
    note
});

const remove = (note) => ({
    type: DELETE_NOTE,
    note
});

export const getNotes = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/notes`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        dispatch(loadNotes(data.notes))
    };
};

export const getNote = (noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`)
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        };
        dispatch(loadNote(data))
    };
};

export const createNote = (user_id, group_id, note_title) => async (dispatch) => {
    const res = await fetch(`/api/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            group_id,
            note_title,
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(create(data));
        return data.id;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};

export const editNote = (noteId, note_title, note_text) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            note_title,
            note_text
        })
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(edit(data));
        return data.id;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};

export const deleteNote = (noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`, {
        method: 'DELETE'
    });

    if (res.ok) {
        const data = await res.json();
        dispatch(remove(data));
        return;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data;
        };
    } else {
        return { 'ERROR': 'An error occurred. Please try again.' }
    };
};

const updateSingleNote = (state, action) => {
    const newState = { ...state };
    newState.notes[action.note.id] = action.note;
    newState.byGroupId[action.note.group_id] = {
        ...newState.byGroupId[action.note.group_id],
        [action.note.id]: action.note
    }
    return newState;
}

const initialState = {
    notes: {},
    byGroupId: {}
};

const notes = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES: {
            const newState = { ...state }
            const loadNotes = {};
            action.notes.forEach(note => {
                loadNotes[note.id] = note;
            });
            newState.notes = { ...loadNotes };
            if (action.notes.length) {
                newState.byGroupId[action.notes[0].group_id] = { ...loadNotes };
            };
            return newState;
        }

        case DELETE_NOTE: {
            const newState = { ...state };
            delete newState.notes[action.note.id];
            delete newState.byGroupId[action.note.group_id][action.note.id];
            return newState;
        }

        case CREATE_NOTE:
        case LOAD_NOTE:
        case EDIT_NOTE: {
            return updateSingleNote(state, action);
        }

        default:
            return state
    }
}

export default notes;
