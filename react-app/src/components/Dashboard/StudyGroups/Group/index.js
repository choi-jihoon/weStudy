import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import DeleteGroupModal from './DeleteGroupModal';
import EditGroupModal from './EditGroupModal';

import { getNotes } from '../../../../store/notes';
import { getRooms } from '../../../../store/rooms';

import './Group.css';

const Group = ({ group }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRooms(group.id))
        dispatch(getNotes(group.id))
    }, [dispatch, group.id])

    return (
        <div className='group-container'>
            {user.id === group.owner_id &&
                <div className='group-btn-container'>
                    <EditGroupModal group={group} />
                    <DeleteGroupModal group={group} />
                </div>
            }
            <Link className='group-title' to={`/groups/${group.id}`}>
                <div className='group-image-container'>
                    <img src={group.group_image} alt={group.group_name}></img>
                </div>
                <div className='group-title-container'>
                    <h4>{group.group_name}</h4>
                    <p>{group.description}</p>
                </div>
            </Link>
        </div>
    )
}

export default Group;
