import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getGroup } from '../../../store/groups';
import Rooms from "../Group/Rooms";
import AddUserToGroupModal from '../AddUserToGroupModal';


import './StudyGroupDash.css'

const StudyGroupDash = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector(state => state.groups);
    const group = groups[groupId]

    useEffect(() => {
        dispatch(getGroup(groupId));
    }, [dispatch, groupId]);

    return (
        <>
            {group &&
            <div className='study-group-dash-container'>
                <Rooms group={group} />
                <AddUserToGroupModal group={group} />
            </div>
            }
        </>
    )
}

export default StudyGroupDash;
