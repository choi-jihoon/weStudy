import { useSelector } from "react-redux";

import Calendar from "../Calendar";
import DeleteEventModal from "./DeleteEventModal";
import EditEventModal from "./EditEventModal";
import JoinEvent from "./JoinEvent";
import LeaveEvent from "./LeaveEvent";

const EventDetail = ({ event }) => {
    const user = useSelector(state => state.session.user);

    const eventDay = event.start_time.slice(5, 8);
    const eventMonth = event.start_time.slice(8, 12).toUpperCase();

    return (
        <div className='event-container'>
            <div className='event-summary'>
                <h3 className='event-day'>{eventDay}</h3>
                <h3 className='event-month'>{eventMonth}</h3>
            </div>
            <div className='event-body'>
                <div className='event-title-description-container'>
                    <div className='event-summary-and-cal-container'>
                        <h3>{event.summary}</h3> <Calendar event={event} />
                    </div>
                    <h4 className='event-section event-description'>{event.description}</h4>
                    <div className='event-start-time event-section'>
                        <p className='event-label'>Starts</p>
                        <p>{event.start_time.slice(0, 22)}</p>
                    </div>
                    <div className='event-end-time event-section'>
                        <p className='event-label'>Ends</p>
                        <p>{event.end_time.slice(0, 22)}</p>
                    </div>
                </div>
                <div className='attendees-list event-section'>
                    <div className='event-label attendees-label'>Attendees
                        <span>
                            {!event.attendee_names.includes(user.username) ?
                                <JoinEvent event={event} />
                                :
                                <LeaveEvent event={event} />
                            }
                        </span>
                    </div>
                    {/* <p>{event.attendee_names.length ? event.attendee_names.join(', ') : "No one is attending."}</p> */}
                    <div className='attendee-pics-container'>
                    {event.attendee_pics.length ?
                            event.attendee_pics.map((image, idx) => (
                                <div key={idx} className='attendee-pic-container'>
                                    <img src={image} alt={idx}></img>
                                </div>
                            ))
                            :
                            <p>No one is attending.</p>
                        }
                        </div>
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
