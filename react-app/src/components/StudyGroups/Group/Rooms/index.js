import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from "../../../../store/rooms";
import Room from './Room';

import './Rooms.css';

const Rooms = ({ group }) => {
    const dispatch = useDispatch();

    const roomsObject = useSelector(state => state.rooms);
    const rooms = Object.values(roomsObject);

    // const group = useSelector(state => state.groups[group.id]);

    useEffect(() => {
        dispatch(getRooms(group.id));
    }, [dispatch, group.id]);

    return (
        <>
            {rooms &&
                <>
                    <div className='rooms-container'>
                        <ul>
                            {rooms.map(room => {
                                return (
                                    <li key={room.id}>
                                        <Room room={room} />
                                    </li>
                                )
                            })}

                        </ul>
                    </div>
                </>
            }
        </>
    )
}


export default Rooms;
