import { useSelector } from "react-redux";

import Calendar from "../../../../Calendar";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from "./EditEventModal";
import JoinEvent from "./JoinEvent";
import LeaveEvent from "./LeaveEvent";

const EventDetail = ({ event }) => {
    const user = useSelector(state => state.session.user);

    return (
        <div className='event-container'>
            <div className='event-summary'>
                <h3>{event.summary}</h3>
            </div>
            <div className='event-body'>
                <h4>{event.description}</h4>
                <div className='event-start-time'>
                    <p>Starts:</p>
                    <p>{event.start_time}</p>
                </div>
                <div className='event-end-time'>
                    <p>Ends:</p>
                    <p>{event.end_time}</p>
                </div>
                <p>Attendees: {event.attendee_names.join(', ')}</p>
                {!event.attendee_names.includes(user.username) ?
                    <JoinEvent event={event} />
                    :
                    <LeaveEvent event={event} />
                }
                <Calendar event={event} />
            </div>
            {user.id === event.user_id &&
                <div className='event-btn-container'>
                    <EditEventModal event={event} />
                    <DeleteEventModal event={event} />
                </div>
            }
        </div>
    )
}

export default EventDetail;
