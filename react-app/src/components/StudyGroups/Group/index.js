import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';

import './Group.css';

const Group = ({ group }) => {
    const user = useSelector(state => state.session.user);

    return (
        <div className='group-container'>
            <Link to={`/groups/${group.id}`}>
                {group.group_name}
            </Link>
            {user.id === group.owner_id &&
            <div className='btn-container'>
                <DeleteGroupModal group={group} />
                <EditGroupModal group={group} />

            </div>
            }
        </div>
    )
}

export default Group;
