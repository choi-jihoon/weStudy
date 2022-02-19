import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';


import { getGroup } from '../../../store/groups';
import { getRooms } from '../../../store/rooms';
import { getNotes } from '../../../store/notes';


import AddUserToGroupModal from '../AddUserToGroupModal';
import LeaveGroupModal from '../LeaveGroupModal';
import RemoveFromGroupModal from '../RemoveFromGroupModal';
import EditGroupModal from '../../StudyGroups/EditGroupModal';
import DeleteGroupModal from '../../StudyGroups/DeleteGroupModal';
import EditGroupPicModal from './EditGroupPicModal';

import './StudyGroupDash.css';

let socket;

const StudyGroupDash = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector(state => state.groups);
    const group = groups[groupId];
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getRooms(groupId));
        dispatch(getNotes(groupId));
    }, [dispatch, groupId]);


    useEffect(() => {
        socket = io();

        socket.emit('login', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': true })
        console.log('connecting', sessionUser.username)
        socket.on('login', (online_status) => {
            dispatch(getGroup(groupId));
            console.log(online_status.username, 'LOGGED IN!')
        });

        return (() => {
            console.log('disconnecting from group', sessionUser.username)
            socket.emit('logout', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': false })
            socket.on('logout', (online_status) => {
                console.log(online_status.username, 'LOGGED OUT!')
                dispatch(getGroup(groupId));
            })
            socket.disconnect();
        });
    }, []);


    return (
        <>
            {group &&
                <div className='study-group-dash-container'>
                    <div className='study-group-title-container'>
                        <div className='study-group-title'>
                            <h1>{group.group_name}</h1>
                        </div>
                        <div className='study-group-title-btn-container'>
                            <AddUserToGroupModal group={group} />{sessionUser.id !== group.owner_id &&
                                <LeaveGroupModal group={group} />
                            }
                        </div>
                        {sessionUser.id === group.owner_id &&
                            <div className='sg-edit-del-btn-container'>
                                <EditGroupModal group={group} />
                                <DeleteGroupModal group={group} />
                            </div>
                        }
                    </div>
                    <div className='sg-main-container'>
                        <div className='sg-info-container'>
                            <div className='sg-img-container'>
                                <img src={group.group_image} alt={group.group_name}></img>
                            </div>
                            {/* <EditGroupPicModal group={group} /> */}
                            <div className='sg-descrip-container'>
                                {group.description}
                            </div>
                        </div>
                        <div className='sg-members-container'>
                            {group.users?.map(user => {
                                return (
                                    <div key={user.id} className='sg-member'>
                                        <div className='pic-and-status-container'>
                                            <div className='profile-pic-div sg-member-profile-pic'>
                                                <img src={user.image} alt={user.username}></img>
                                            </div>
                                            <div className={user.online ? 'status-circle online' : 'status-circle offline'}>
                                                <div className='inner-circle'></div>
                                            </div>
                                        </div>
                                        <div className='sg-member-name'>
                                            {user.username}
                                        </div>
                                        {(sessionUser.id === group.owner_id && sessionUser.id !== user.id) &&
                                            <RemoveFromGroupModal group={group} user={user} />
                                        }
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>

            }
        </>
    )
}

export default StudyGroupDash;
