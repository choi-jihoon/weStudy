import './Group.css';

const Group = ({ group }) => {
    return (
        <div className='group-container'>
            {group.group_name}
        </div>
    )
}

export default Group;
