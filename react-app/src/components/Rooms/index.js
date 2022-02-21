// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { getRooms } from "../../../../store/rooms";
// import Room from './Room';

// import './Rooms.css';

// const Rooms = ({ group }) => {
//     const dispatch = useDispatch();
//     const roomsObject = useSelector(state => state.rooms);

//     useEffect(() => {
//         dispatch(getRooms(group.id));
//     }, [dispatch, group.id]);

//     return (
//         <>
//             {roomsObject.byGroupId[group.id] &&
//                 <>
//                     <div className='rooms-container'>
//                         <ul>
//                             {Object.values(roomsObject.byGroupId[group.id]).map(room => {
//                                 return (
//                                     <li key={room.room_name}>
//                                         <Room room={room} />
//                                     </li>
//                                 )
//                             })}

//                         </ul>
//                     </div>
//                 </>
//             }
//         </>
//     )
// }


// export default Rooms;
