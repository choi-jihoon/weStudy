import './NoEvents.css';

const NoEvents = () => {
    return (
        <div className='no-events-container'>
            <p>There are no events scheduled for this group.</p>
            <p id='second-line'>You can create the first one by clicking the plus sign in the top right corner.</p>
        </div>
    )
};

export default NoEvents;
