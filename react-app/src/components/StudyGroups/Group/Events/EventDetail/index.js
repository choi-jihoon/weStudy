import { useSelector } from "react-redux";

import Calendar from "../../../../Calendar";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from "./EditEventModal";

const EventDetail = ({ event }) => {
    const user = useSelector(state => state.session.user);

    return (
        <div className='event-container'>
            <h3>{event.summary}</h3>
            <h4>{event.description}</h4>
            <p>Starts: {event.start_time}</p>
            <p>Ends: {event.end_time}</p>
            <p>Attendees: {event.attendees.map(user => user.username)}</p>
            {user.id === event.user_id &&
                <div className='event-btn-container'>
                    <EditEventModal event={event} />
                    <DeleteEventModal event={event} />
                </div>
            }
            <Calendar event={event} />
        </div>
    )
}

export default EventDetail;
