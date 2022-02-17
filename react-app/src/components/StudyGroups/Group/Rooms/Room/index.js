import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import EditRoomModal from '../EditRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';
import { getChatMessages } from '../../../../../store/chats';

const Room = ({ room }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);
    const chatsObj = useSelector(state => state.chats);

    useEffect(() => {
        dispatch(getChatMessages(room.id));
    }, [dispatch])

    // return (
    //     <>
    //         <div className='room-container'>
    //             <Link to={`/groups/${room.group_id}/rooms/${room.id}/chat`}>
    //                 {room.room_name} <span><i className="fas fa-door-open"></i></span>
    //             </Link>
    //             {user.id === room.user_id &&
    //                 <div className='btn-container'>
    //                     <EditRoomModal room={room} />
    //                     <DeleteRoomModal room={room} />
    //                 </div>
    //             }
    //         </div>
    //     </>
    // )

    return (
        <>
            {
                user.id === room.user_id &&
                <div className='btn-container'>
                    <EditRoomModal room={room} />
                    <DeleteRoomModal room={room} />
                </div>
            }
            <NavLink activeClassName='active'
                to={`/groups/${room.group_id}/rooms/${room.id}/chat`}>
                <li className='room-container'>
                    {room.room_name}
                    {user.id !== room.user_id &&
                        <i className="fas fa-door-open"></i>
                    }
                </li>
            </NavLink>
        </>
    )
}

export default Room;
