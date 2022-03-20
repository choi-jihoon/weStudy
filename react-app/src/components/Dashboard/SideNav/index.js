import { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";

import Album from "../StudyGroups/Group/Album";
import CreateAlbumModal from "../StudyGroups/Group/Album/CreateAlbumModal";
import CreateGroupModal from "../StudyGroups/CreateGroupModal";
import CreateNoteModal from "../../Dashboard/StudyGroups/Group/Note/CreateNoteModal";
import CreateRoomModal from "../StudyGroups/Group/Room/CreateRoomModal";
import EditProfileModal from "./EditProfileModal";
import LogoutButton from "../../auth/LogoutButton";
import Note from '../../Dashboard/StudyGroups/Group/Note';
import Room from '../../Dashboard/StudyGroups/Group/Room';
import JoinGroupModal from "../StudyGroups/JoinGroupModal";

import './SideNav.css';

const SideNav = () => {
    const location = useLocation();
    const user = useSelector(state => state.session.user);
    const [open, setOpen] = useState(true)


    const toggleMenu = (e) => {
        const dropdown = document.querySelector('.side-panel-nav-links')
        if (!open) {
            dropdown.style.display = 'block';
            dropdown.style.visibility = 'visible';
            setOpen(true);
        }
        else {
            dropdown.style.display = 'none';
            dropdown.style.visibility = 'hidden';
            setOpen(false);
        }
    }

    const userMenu = (
        <>
            <div className='user-profile-edit-container'>
                <EditProfileModal />
                <div className='profile-pic-div user-profile-nav'>
                    <img className='profile-pic' src={user.image} alt={user.username}></img>
                </div>
            </div>
            <div className='username-text'>
                <NavLink to='/'>{user.username}</NavLink>
                <i className="fa-solid fa-bars menu-btn" onClick={toggleMenu}></i>
                <LogoutButton />
            </div>
        </>
    )

    const path = location.pathname;
    const groupId = path.split('/')[2]

    const groupObj = useSelector(state => state.groups);
    const roomObj = useSelector(state => state.rooms);
    const notesObj = useSelector(state => state.notes);
    const albumsObj = useSelector(state => state.albums);

    return (
        <>
            <div className='side-nav-container'>
                <div className='user-pic-name-container'>
                    {userMenu}
                </div>
                <ul className='side-panel-nav-links'>
                    <NavLink exact activeClassName='active' to='/'>
                        <li id='home-link'>
                            Dashboard
                        </li>
                    </NavLink>
                    {!groupId &&
                        <>
                            <CreateGroupModal />
                            <JoinGroupModal />
                        </>
                    }
                    {(groupId && groupObj) &&
                        <>
                            <NavLink exact activeClassName='active'
                                to={`/groups/${groupId}`}>
                                <li>
                                    <i className="fas fa-users"></i>
                                    {groupObj[groupId]?.group_name}
                                </li>
                            </NavLink>
                            <NavLink exact activeClassName='active'
                                to={`/groups/${groupId}/events`}>
                                <li id='events-link'>
                                    <i className="far fa-calendar-alt"></i>
                                    Calendar</li>
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
                            <li>Albums <CreateAlbumModal group={groupObj[groupId]} /></li>
                            <ul>
                                {albumsObj.byGroupId[groupId] && Object.values(albumsObj.byGroupId[groupId]).map(album => (
                                    <Album key={album.id} album={album} />
                                ))}
                            </ul>
                        </>
                    }
                    <div className='developer'>
                        <a target="_blank" rel="noreferrer noopener"
                            href='https://github.com/choi-jihoon/weStudy'>
                            © 2022 | weStudy
                        </a>
                        <p>Developed by Fiona Choi
                            <span>
                                <a target="_blank" rel="noreferrer noopener"
                                    href='https://github.com/choi-jihoon'>
                                    <i className='fab fa-github' />
                                </a>
                            </span>
                            <span>
                                <a target="_blank" rel="noreferrer noopener"
                                    href='https://www.linkedin.com/in/jihoon-choi-a6967a221/'>
                                    <i className='fab fa-linkedin' />
                                </a>
                            </span>
                        </p>
                    </div>
                </ul>
            </div>
        </>
    )
}

export default SideNav;
