import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import Room from "../../StudyGroups/Group/Rooms/Room";
import Note from "../../StudyGroups/Group/Notes/Note";

import DropdownMenu from "../../NavBar/DropdownMenu";
import CreateGroupModal from "../../StudyGroups/CreateGroupModal";
import LogoutButton from "../../auth/LogoutButton";
import CreateRoomModal from "../../StudyGroups/StudyGroupDash/CreateRoomModal";
import CreateNoteModal from "../../StudyGroups/Group/Notes/CreateNoteModal";

import './SideNav.css';

const SideNav = () => {
    const location = useLocation();
    const user = useSelector(state => state.session.user);
    const userMenu = (
        <>
            <div className='profile-pic-div user-profile-nav'>
                <img className='profile-pic' src={user.image} alt={user.username}></img>
            </div>
            <div className='username-text'>
                {user.username}
            </div>
        </>
    )

    const path = location.pathname;
    const groupId = path.split('/')[2]

    const groupObj = useSelector(state => state.groups)
    const groups = Object.values(groupObj)
    const roomObj = useSelector(state => state.rooms)
    const notesObj = useSelector(state => state.notes)




    return (
        <div className='side-nav-container'>
            <div className='user-pic-name-container'>
                <DropdownMenu title={userMenu} items={[<LogoutButton />]} />
            </div>
            <ul className='side-panel-nav-links'>
                <NavLink exact activeClassName='active' to='/'>
                    <li id='home-link'>
                        Dashboard
                    </li>
                </NavLink>
                {!groupId &&

                    <CreateGroupModal />

                }
                {(groupId && groupObj) &&
                    <>
                        <NavLink exact activeClassName='active'
                            to={`/groups/${groupId}`}>
                            <li>
                                {groupObj[groupId]?.group_name}
                            </li>
                        </NavLink>
                        <li>Rooms <CreateRoomModal group={groupObj[groupId]} /></li>
                        <ul className='all-room-with-btns'>
                            {roomObj.byGroupId[groupId] && Object.values(roomObj.byGroupId[groupId]).map(room => (
                                <Room key={room.id} room={room} />
                            ))}
                        </ul>
                        <li>Notes <CreateNoteModal group={groupObj[groupId]} /></li>
                        <ul>
                            {notesObj.byGroupId[groupId] && Object.values(notesObj.byGroupId[groupId]).map(note => (
                                <Note key={note.id} note={note} />
                            ))}
                        </ul>
                    </>
                }
            </ul>
        </div>
    )
}

export default SideNav;
