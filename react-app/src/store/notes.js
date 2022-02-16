const LOAD_NOTES = 'notes/LOAD_NOTES';
const CREATE_NOTE = 'notes/CREATE_NOTE';

const loadNotes = (notes) => ({
    type: LOAD_NOTES,
    notes
});

const create = (note) => ({
    type: CREATE_NOTE,
    note
});

export const getNotes = (groupId) => async (dispatch) => {
    const res = await fetch(`/api/groups/${groupId}/notes`);
    if (res.ok) {
        const data = await res.json();
        if (data.errors) {
            return;
        }
        dispatch(loadNotes(data.notes))
    }
};

export const createNote = (user_id, group_id, note_title, note_text) => async (dispatch) => {
    const res = await fetch(`/api/notes/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            user_id,
            group_id,
            note_title,
            note_text
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


const initialState = {};

const notes = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_NOTES: {
            const loadNotes = {};
            action.notes.forEach(note => {
                loadNotes[note.id] = note;
            });
            return { ...loadNotes }
        }

        case CREATE_NOTE: {
            const newState = { ...state };
            newState[action.note.id] = action.note;
            return newState;
        }

        default:
            return state
    }
}

export default notes;
