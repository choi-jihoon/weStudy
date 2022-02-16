import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getNote } from '../../../../../../store/notes';

import './NoteDetail.css';


const NoteDetail = () => {
    const { noteId } = useParams();
    const dispatch = useDispatch();
    const notes = useSelector(state => state.notes);
    const note = notes[noteId];

    useEffect(() => {
        dispatch(getNote(noteId));
    }, [dispatch, noteId]);

    return (
        <div className='note-detail-container'>
            <h2>{note?.note_title}</h2>
            <i className="fas fa-pencil-alt"></i>
            <p>{note?.note_text}</p>
        </div>
    )

}

export default NoteDetail;
