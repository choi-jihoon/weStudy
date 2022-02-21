import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { deleteRoom } from '../../../../../../store/rooms';

function DeleteRoomForm({ showModal, room }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const isChat = location.pathname.split('/')

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(deleteRoom(room.id));

        if (isChat[isChat.length - 1] === 'chat') {
            history.push(`/groups/${room.group_id}`)
        }

        showModal(false);
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
                        Are you sure you want to delete <span className='bold'>#{room.room_name}</span>?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Delete Room
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

export default DeleteRoomForm;
