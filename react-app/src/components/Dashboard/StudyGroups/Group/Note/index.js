import { NavLink } from "react-router-dom";

const Note = ({ note }) => {
    return (
        <NavLink activeClassName='active'
            to={`/groups/${note.group_id}/notes/${note.id}`}>
            <li className='note-title'>
                <i className="far fa-file-alt"></i>
                <p className='side-nav-overflow-control'>
                    {note.note_title}
                </p>
            </li>
        </NavLink>
    )
};

export default Note;
