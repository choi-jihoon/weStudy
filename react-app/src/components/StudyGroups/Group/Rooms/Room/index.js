import { Link } from 'react-router-dom';

const Room = ({ room }) => {
    return (
        <Link to={`/rooms/${room.id}/chat`}>
            <div className='room-container group-container'>
                {room.room_name}
            </div>
        </Link>
    )
}

export default Room;
