import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNote, editNote } from '../../../../../../store/notes';
import DeleteNote from '../DeleteNote';


import './NoteDetail.css';


const NoteDetail = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const note = notes[noteId];

    const [title, setTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateText = (e) => {
        setNoteText(e.target.value);
    }

    const handleSave = (e) => {
        dispatch(editNote(noteId, title, noteText))
    }

    useEffect(() => {
        dispatch(getNote(noteId));
    }, [dispatch, noteId]);

    useEffect(() => {
        if (note) {
            setTitle(note.note_title);
            setNoteText(note.note_text);
        } else {
            setTitle("");
            setNoteText("");
        }
    }, [note])

    return (
        <div className='note-detail-container'>
            <div className='edit-container'>
                    <input
                        name='note_title'
                        id='edit-note-title'
                        type='text'
                        value={title}
                        onChange={updateTitle}
                        onBlur={handleSave}
                    />
                    <textarea
                        name='note_text'
                        id='note-area'
                        value={noteText}
                        onChange={updateText}
                        // onBlur={handleSave}
                    />
                    <button
                        id='save-btn'
                        onClick={handleSave}>
                        Save
                    </button>
                    <div className='edit-delete-btn-container'>
                        {/* <i className="fas fa-pencil-alt"></i> */}
                        <DeleteNote note={note} />
                    </div>
            </div>
        </div>
    )

}

export default NoteDetail;
