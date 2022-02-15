import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getGroup } from '../../../store/groups';
import Rooms from "../Group/Rooms";
import AddUserToGroupModal from '../AddUserToGroupModal';
import LeaveGroupModal from '../LeaveGroupModal';
import CreateRoomModal from './CreateRoomModal';


import './StudyGroupDash.css'

const StudyGroupDash = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector(state => state.groups);
    const group = groups[groupId];
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getGroup(groupId));
    }, [dispatch, groupId]);

    return (
        <>
            {group &&
            <div className='study-group-dash-container'>
                <AddUserToGroupModal group={group} />
                {user.id !== group.owner_id &&
                <LeaveGroupModal group={group} />
                }
                <CreateRoomModal group={group} />
                <Rooms group={group} />
            </div>
            }
        </>
    )
}

export default StudyGroupDash;
