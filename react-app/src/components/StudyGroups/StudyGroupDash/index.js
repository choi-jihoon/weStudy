import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getGroup } from '../../../store/groups';
import { getRooms } from '../../../store/rooms';


import AddUserToGroupModal from '../AddUserToGroupModal';
import LeaveGroupModal from '../LeaveGroupModal';



import './StudyGroupDash.css'

const StudyGroupDash = () => {
    const dispatch = useDispatch();
    const { groupId } = useParams();
    const groups = useSelector(state => state.groups);
    const group = groups[groupId];
    const user = useSelector(state => state.session.user);



    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getRooms(groupId));
    }, [dispatch, groupId]);

    return (
        <>
            {group &&
                <div className='study-group-dash-container'>
                    <div className='study-group-title-container'>
                        <div className='study-group-title'>
                            <h1>{group.group_name}</h1>
                        </div>
                        <div className='study-group-title-btn-container'>
                            <AddUserToGroupModal group={group} />{user.id !== group.owner_id &&
                                <LeaveGroupModal group={group} />
                            }
                        </div>
                    </div>
                    {/* <div className='rooms-and-btn-container'>
                        <CreateRoomModal group={group} />
                        <Rooms group={group} />
                    </div>
                    <Notes group={group} /> */}
                </div>

            }
        </>
    )
}

export default StudyGroupDash;
