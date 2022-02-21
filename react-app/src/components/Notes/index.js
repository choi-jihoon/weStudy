// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
// import { getNotes } from '../../../../store/notes';
// import Note from '../Dashboard/StudyGroups/Group/Note';
// import CreateNoteModal from '../Dashboard/StudyGroups/Group/Note/CreateNoteModal';

// const Notes = ({ group }) => {
//     const dispatch = useDispatch();
//     const notesObj = useSelector(state => state.notes);

//     useEffect(() => {
//         dispatch(getNotes(group.id))
//     }, [dispatch, group.id]);

//     return (
//         <div className='all-notes-container'>
//             <CreateNoteModal group={group} />
//             <ul>
//                 {notesObj.byGroupId[group.id] &&
//                     <>
//                         {Object.values(notesObj.byGroupId[group.id]).map(note => {
//                             return (
//                                 <Link to={`/groups/${group.id}/notes/${note.id}`} key={note.id}>
//                                     <li className='note-title'>
//                                         <Note note={note} />
//                                     </li>
//                                 </Link>
//                             )
//                         })}
//                     </>
//                 }
//             </ul>
//         </div >
//     )

// };

// export default Notes;
