import { Link } from 'react-router-dom';
import DeleteGroupModal from '../DeleteGroupModal';
import EditGroupModal from '../EditGroupModal';

import './Group.css';

const Group = ({ group }) => {
    return (
        <div className='group-container'>
            <Link to={`/groups/${group.id}`}>
                {group.group_name}
            </Link>
            <div className='btn-container'>
                <DeleteGroupModal group={group} />
                <EditGroupModal group={group} />
            </div>
        </div>
    )
}

export default Group;
