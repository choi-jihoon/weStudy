import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

import { getAlbums } from '../../../../../store/albums';
import { getEvents } from '../../../../../store/events';
import { getGroup } from '../../../../../store/groups';
import { getNotes } from '../../../../../store/notes';
import { getRooms } from '../../../../../store/rooms';
import { getNotifications } from '../../../../../store/notifications';

import AddUserToGroupModal from './AddUserToGroupModal';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';
import LeaveGroupModal from './LeaveGroupModal';
import RemoveFromGroupModal from './RemoveFromGroupModal';
import NotificationsModal from './NotificationsModal';

import './StudyGroupDash.css';

const StudyGroupDash = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { groupId } = useParams();
    const groups = useSelector(state => state.groups);
    const notes = useSelector(state => state.notes);
    const group = groups[groupId];
    const sessionUser = useSelector(state => state.session.user);

    const compare = (a, b) => {
        if (a.username.toLowerCase() < b.username.toLowerCase()) {
            return -1;
        }
        if (a.username.toLowerCase() > b.username.toLowerCase()) {
            return 1;
        }
        return 0;
    }
    const sorted = group?.users.sort(compare);


    useEffect(() => {
        const fetch = async () => {
            const data = await dispatch(getGroup(groupId));
            if (data && data.errors) {
                return history.push('/');
            }
            else {
                dispatch(getRooms(groupId));
                dispatch(getNotes(groupId));
                dispatch(getEvents(groupId));
                dispatch(getAlbums(groupId));
                dispatch(getNotifications(groupId));
            }
        }
        fetch();
    }, [dispatch, groupId, history]);

    useEffect(() => {
        const checkAccess = (group) => {
            if (group.user_ids.includes(sessionUser.id)) {
                return true;
            }
            else return false;
        };

        if (sessionUser && group) {
            if (!checkAccess(group)) {
                return history.push('/')
            };
        };
    }, [group, sessionUser, history])

    return (
        <>
            {group &&
                <div className='study-group-title-container'>
                    <div className='study-group-title'>
                        <h2>{group.group_name}</h2>
                    </div>
                    <div className='study-group-title-btn-container'>
                        <AddUserToGroupModal group={group} />
                        <NotificationsModal group={group} />
                        {sessionUser.id !== group.owner_id &&
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

            }
            {group &&
                <div className='study-group-dash-container'>
                    <div className='sg-main-container'>
                        <div className='sg-info-container'>
                            <div className='sg-img-container'>
                                <img src={group?.group_image} alt={group?.group_name}></img>
                            </div>
                            <div className='sg-descrip-container'>
                                {group.description}
                            </div>
                        </div>
                        <div className='sg-members-container'>
                            {sorted.map(user => {
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
                                            {user.id === group.owner_id && <i className="fas fa-crown"></i>}{user.username}
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
