import { Link } from 'react-router-dom';
import DeleteGroupModal from '../DeleteGroupModal';

import './Group.css';

const Group = ({ group }) => {
    return (
        <Link to={`/groups/${group.id}`}>
            <div className='group-container'>
                {group.group_name}
                <DeleteGroupModal group={group} />
            </div>
        </Link>
    )
}

export default Group;
