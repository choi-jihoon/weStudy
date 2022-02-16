import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';

import './Group.css';

const Group = ({ group }) => {
    const user = useSelector(state => state.session.user);

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
