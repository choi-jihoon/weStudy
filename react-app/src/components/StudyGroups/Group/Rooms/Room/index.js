import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import EditRoomModal from '../EditRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';
import { getChatMessages } from '../../../../../store/chats';

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
                    {room.room_name}
                </li>
            </NavLink>
        </div>
    )
}

export default Room;
