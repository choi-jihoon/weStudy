import { useDispatch } from 'react-redux';
import { leaveEvent } from '../../../../../../../store/events';

const LeaveEvent = ({ event }) => {
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        await dispatch(leaveEvent(event.id));
        return;
    }

    return (
        <div id='leave-event' onClick={handleClick}>
            Leave
        </div>
    )
}

export default LeaveEvent;
