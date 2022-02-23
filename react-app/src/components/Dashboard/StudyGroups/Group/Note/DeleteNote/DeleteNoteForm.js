import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteNote } from "../../../../../../store/notes";

function DeleteNoteForm({ showModal, note }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        const groupId = note.group_id

        await dispatch(deleteNote(note.id));
        showModal(false);
        history.push(`/groups/${groupId}`);

    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        showModal(false);
    }

    return (
        <div>
            <form className='delete-confirmation-container' onSubmit={handleSubmit}>
                <div className='dc-text-container'>
                    <div className='dc-text'>
                        Are you sure you want to delete this note?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Delete Note
                    </button>
                    <button
                        type='button'
                        onClick={handleCancelClick}
                        className='form-cancel-btn'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteNoteForm;
