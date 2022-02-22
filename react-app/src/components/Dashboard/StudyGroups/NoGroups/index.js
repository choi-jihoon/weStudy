import './NoGroups.css';

const NoGroups = () => {
    return (
        <div className='no-groups-container'>
            <h2 className='no-groups'>Welcome to weStudy!</h2>
            {/* <h3 className='no-groups'>You don't belong to any groups.</h3> */}
            <p>You don't belong to any groups yet.<br></br>You can create one and start inviting friends, or ask to be invited to one.</p>
        </div>
    )
}

export default NoGroups;
