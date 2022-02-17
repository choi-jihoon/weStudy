import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getNote, editNote } from '../../../../../../store/notes';
import DeleteNote from '../DeleteNote';

import './NoteDetail.css';

toast.configure();

const NoteDetail = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const note = notes.notes[noteId];

    const [title, setTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    const notify = () => {
		toast(`Your edits have been saved!`, {
			position: toast.POSITION.TOP_CENTER,
			autoClose: 2000,
		});
	};

    const updateTitle = (e) => {
        setTitle(e.target.value);
    }

    const updateText = (e) => {
        setNoteText(e.target.value);
    }

    const handleSave = (e) => {
        dispatch(editNote(noteId, title, noteText))
        notify();
    }

    useEffect(() => {
        dispatch(getNote(noteId));
    }, [dispatch, noteId]);

    useEffect(() => {
        if (note) {
            setTitle(note.note_title);
            if (note.note_text) setNoteText(note.note_text)
            else setNoteText("");
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
                        // onBlur={handleSave}
                    />
                    <textarea
                        name='note_text'
                        id='note-area'
                        value={noteText}
                        onChange={updateText}
                        // onBlur={handleSave}
                    />
                    <div
                        id='save-btn'
                        onClick={handleSave}>
                        Save <i className="fas fa-pencil-alt"></i>
                    </div>
                    <div className='edit-delete-btn-container'>
                        <DeleteNote note={note} />
                    </div>
            </div>
        </div>
    )

}

export default NoteDetail;
