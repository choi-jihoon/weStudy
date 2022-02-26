import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { getChatMessages } from '../../../../../store/chats';

import EditRoomModal from './EditRoomModal';
import DeleteRoomModal from './DeleteRoomModal';

const Room = ({ room }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getChatMessages(room.id));
    }, [dispatch, room.id])

    return (
        <div className='room-with-btns'>
            {
                (user.id === room.user_id || user.id === room.group_owner_id) &&
                <div className='btn-container'>
                    <EditRoomModal room={room} />
                    <DeleteRoomModal room={room} />
                </div>
            }
            <NavLink activeClassName='active'
                to={`/groups/${room.group_id}/rooms/${room.id}/chat`}>
                <li className='room-container'>
                    <i className="fas fa-door-open"></i>
                    <p className='side-nav-overflow-control'>{room.room_name}</p>
                    <i className='active-users-num'>[ {room.active_users.length} ]</i>
                </li>
            </NavLink>
        </div>
    )
}

export default Room;
