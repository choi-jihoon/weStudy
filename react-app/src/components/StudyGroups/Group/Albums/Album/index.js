import { NavLink } from 'react-router-dom';

const Album = ({ album }) => {
    return (
        <NavLink activeClassName='active'
            to={`/groups/${album.group_id}/albums/${album.id}`}>
            <li className='album-title'>
                <i className="far fa-images"></i>
                {album.title}
            </li>
        </NavLink>
    )
};

export default Album;
