import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditRoomModal from '../EditRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';

const Room = ({ room }) => {

    const user = useSelector(state => state.session.user);

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
            <NavLink activeClassName='active'
                to={`/groups/${room.group_id}/rooms/${room.id}/chat`}>
                <li className='room-container'>
                    {room.room_name}
                </li>
            </NavLink>
            {
                user.id === room.user_id &&
                <div className='btn-container'>
                    <EditRoomModal room={room} />
                    <DeleteRoomModal room={room} />
                </div>
            }
        </>
    )
}

export default Room;
