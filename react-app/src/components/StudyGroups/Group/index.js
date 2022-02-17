import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';
import { getRooms } from '../../../store/rooms';
import { getNotes } from '../../../store/notes';

import './Group.css';

const Group = ({ group }) => {
    const user = useSelector(state => state.session.user);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getRooms(group.id))
        dispatch(getNotes(group.id))
    }, [dispatch])

    return (
        <div className='group-container'>
            <img src={group.group_image} alt={group.group_name}></img>
            <Link className='group-title' to={`/groups/${group.id}`}>
                <h4>{group.group_name}</h4>
                <p>{group.description}</p>
            </Link>
            {user.id === group.owner_id &&
            <div className='btn-container'>
                <EditGroupModal group={group} />
                <DeleteGroupModal group={group} />
            </div>
            }
        </div>
    )
}

export default Group;
