const Group = ({ group }) => {
    return (
        <div className='group-container'>
            {group.group_name}
            {group.description}
        </div>
    )
}

export default Group;
