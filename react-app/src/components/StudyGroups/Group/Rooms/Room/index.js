import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import EditRoomModal from '../EditRoomModal';
import DeleteRoomModal from '../DeleteRoomModal';

const Room = ({ room }) => {

    const user = useSelector(state => state.session.user);

    return (
        <>
            <div className='room-container group-container'>
                <Link to={`/rooms/${room.id}/chat`}>
                    {room.room_name}
                </Link>
                {user.id === room.user_id &&
                    <div className='btn-container'>
                        <EditRoomModal room={room} />
                        <DeleteRoomModal room={room} />
                    </div>
                }
            </div>
        </>
    )
}

export default Room;
