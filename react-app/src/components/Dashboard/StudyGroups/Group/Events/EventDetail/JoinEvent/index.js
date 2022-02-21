import { useDispatch } from 'react-redux';
import { joinEvent } from '../../../../../../../store/events';

const JoinEvent = ({ event }) => {

    const dispatch = useDispatch();
    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(joinEvent(event.id));
        return;
    }

    return (
        <div id='join-event' onClick={handleClick}>
            Join
        </div>
    )

}

export default JoinEvent;
