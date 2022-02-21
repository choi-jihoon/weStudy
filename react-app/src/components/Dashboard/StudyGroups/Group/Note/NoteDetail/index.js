import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getNote, editNote } from '../../../../../../store/notes';
import { getRooms } from '../../../../../../store/rooms';
import { getAlbums } from '../../../../../../store/albums';
import DeleteNote from '../DeleteNote';

import './NoteDetail.css';

toast.configure();

const NoteDetail = () => {
    const { noteId, groupId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const note = notes.notes[noteId];

    const [title, setTitle] = useState('');
    const [noteText, setNoteText] = useState('');

    const notify = () => {
        toast(`Your edits have been saved!`, {
            position: toast.POSITION.TOP_RIGHT,
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
        dispatch(getRooms(groupId));
        dispatch(getAlbums(groupId));
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
        <>
            <div className='edit-container'>
                <input
                    autoComplete="off"
                    name='note_title'
                    id='edit-note-title'
                    type='text'
                    value={title}
                    onChange={updateTitle}
                // onBlur={handleSave}
                />
                <div className='edit-delete-btn-container'>
                    <DeleteNote note={note} />
                </div>
            </div>
            <div className='note-detail-container'>
                <textarea
                    name='note_text'
                    id='note-area'
                    value={noteText}
                    onChange={updateText}
                />
                <div
                    id='save-btn'
                    onClick={handleSave}>
                    Save <i className="fas fa-pencil-alt"></i>
                </div>
            </div>
        </>
    )

}

export default NoteDetail;