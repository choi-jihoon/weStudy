import DeleteGroupModal from '../DeleteGroupModal';

import './Group.css';

const Group = ({ group }) => {
    return (
        <div className='group-container'>
            {group.group_name}
            <DeleteGroupModal group={group} />
        </div>
    )
}

export default Group;
