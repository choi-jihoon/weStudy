import Calendar from "../../../../Calendar";
import DeleteEventModal from "./DeleteEventModal";

const EventDetail = ({ event }) => {


    return (
        <div className='event-container'>
            <h3>{event.summary}</h3>
            <h4>{event.description}</h4>
            <p>Starts: {event.start_time}</p>
            <p>Ends: {event.end_time}</p>
            <p>Attendees: {event.attendees.map(user => user.username)}</p>
            <DeleteEventModal event={event} />
            <Calendar event={event} />
        </div>
    )
}

export default EventDetail;
