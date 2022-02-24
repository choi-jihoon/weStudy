import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import DeleteAlbumModal from './DeleteAlbumModal';
import EditAlbumModal from './EditAlbumModal';

const Album = ({ album }) => {
    const user = useSelector(state => state.session.user);
    return (
        <div className='room-with-btns'>
            {
                (user.id === album.user_id || user.id === album.group_owner_id) &&
                <div className='btn-container'>
                    <EditAlbumModal album={album} />
                    <DeleteAlbumModal album={album} />
                </div>
            }
            <NavLink activeClassName='active'
                to={`/groups/${album.group_id}/albums/${album.id}`}>
                <li className='album-title room-container'>
                    <i className="far fa-images"></i>
                    <p className='side-nav-overflow-control'>
                        {album.title}
                    </p>
                </li>
            </NavLink>
        </div>
    )
};

export default Album;
