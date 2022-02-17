import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import DropdownMenu from "../../NavBar/DropdownMenu";
import CreateGroupModal from "../../StudyGroups/CreateGroupModal";
import LogoutButton from "../../auth/LogoutButton";

import './SideNav.css';

const SideNav = () => {
    const location = useLocation();
    const user = useSelector(state => state.session.user);
    const userMenu = (
        <>
            <div className='profile-pic-div user-profile-nav'>
                <img className='profile-pic' src={user.image} alt={user.username}></img>
            </div>
            <div>
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
                <DropdownMenu title={userMenu} items={[<CreateGroupModal />, <LogoutButton />]} />
            </div>
            <ul>
                <li><NavLink activeClassName='active' to='/'>Home</NavLink></li>
                {(groupId && groupObj) &&
                    <>
                        <li><NavLink activeClassName='active' to={`/groups/${groupId}`}>{groups[Number(groupId) - 1]?.group_name}</NavLink></li>
                        <li>Rooms</li>
                        <ul>
                            {roomObj.byGroupId[groupId] && Object.values(roomObj.byGroupId[groupId]).map(room => (
                                <li key={room.id}><NavLink activeClassName='active' to={`/groups/${groupId}/rooms/${room.id}/chat`}>{room.room_name}</NavLink></li>
                            ))}
                        </ul>
                        <li>Notes</li>
                        <ul>
                            {notesObj.byGroupId[groupId] && Object.values(notesObj.byGroupId[groupId]).map(note => (
                                <li key={note.id}><NavLink activeClassName='active' to={`/groups/${groupId}/notes/${note.id}`}>{note.note_title}</NavLink></li>
                            ))}
                        </ul>
                    </>
                }
            </ul>
        </div>
    )
}

export default SideNav;
