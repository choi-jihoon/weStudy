import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getRooms } from "../../../../store/rooms";
import Room from './Room';

const Rooms = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();

    const roomsObject = useSelector(state => state.rooms);
    const rooms = Object.values(roomsObject);

    const group = useSelector(state => state.groups[groupId])

    useEffect(() => {
        dispatch(getRooms(groupId));
    }, [dispatch, groupId]);

    return (
        <>
            {rooms &&
                <>
                    <h1>Rooms for {group.group_name}</h1>
                    <div className='rooms-container study-groups-container'>
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
