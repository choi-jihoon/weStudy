import { useSelector } from "react-redux";

import Calendar from "../Calendar";
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
                <h4 className='event-section event-description'>{event.description}</h4>
                <div className='event-start-time event-section'>
                    <p className='event-label'>Starts</p>
                    <p>{event.start_time.slice(0, 25)}</p>
                </div>
                <div className='event-end-time event-section'>
                    <p className='event-label'>Ends</p>
                    <p>{event.end_time.slice(0, 25)}</p>
                </div>
                <div className='attendees-list event-section'>
                    <p className='event-label'>Attendees</p>
                    <p>{event.attendee_names.length ? event.attendee_names.join(', ') : "No one is attending."}</p>
                </div>
                <div className='event-join-add-btns-container'>
                    <Calendar event={event} />
                    {!event.attendee_names.includes(user.username) ?
                        <JoinEvent event={event} />
                        :
                        <LeaveEvent event={event} />
                    }
                </div>
            </div>
            {(user.id === event.user_id || user.id === event.group_owner_id) &&
                <div className='event-btn-container'>
                    <EditEventModal event={event} />
                    <DeleteEventModal event={event} />
                </div>
            }
        </div>
    )
}

export default EventDetail;