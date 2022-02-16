import { Link } from 'react-router-dom';

const Note = ({ note }) => {
    return (
        <>
            <Link to={`/notes/${note.id}`}>
                {note.note_title}
            </Link>
        </>
    )
};

export default Note;
