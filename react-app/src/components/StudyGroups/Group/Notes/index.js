import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNotes } from '../../../../store/notes';
import Note from './Note';

const Notes = ({ group }) => {
    const dispatch = useDispatch();
    const notesObj = useSelector(state => state.notes);
    const notes = Object.values(notesObj);

    useEffect(() => {
        dispatch(getNotes(group.id))
    }, [dispatch, group.id]);

    return (
        <div className='all-notes-container'>
            <ul>
                {notes?.map(note => {
                    return (<li key={note.id}>
                        <Note note={note} />
                    </li>)
                })}
            </ul>
        </div>
    )

};

export default Notes;
