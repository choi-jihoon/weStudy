import { useDispatch } from "react-redux";
import { useLocation, useHistory } from 'react-router-dom';

import { deleteAlbum } from '../../../../../../store/albums';

function DeleteAlbumForm({ showModal, album }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(deleteAlbum(album.id));

        if (location.pathname.split('/').length === 5) {
            history.push(`/groups/${album.group_id}`)
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
                        Are you sure you want to delete <span className='bold'>{album.title}</span> and all the images inside it?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Delete Album
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

export default DeleteAlbumForm;
