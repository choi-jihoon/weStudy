import Calendar from "../../../../Calendar";

const EventDetail = ({ event }) => {
    // const offset = new Date().getTimezoneOffset() / 60
    // const local = (new Date(event.start_time).setHours((new Date(event.start_time)).getHours() + offset))
    // const what = new Date(local).toISOString()

    return (
        <div className='event-container'>
            <h3>{event.summary}</h3>
            <h4>{event.description}</h4>
            <p>Starts: {event.start_time}</p>
            <p>Ends: {event.end_time}</p>
            <p>Attendees: {event.attendees.map(user => user.username)}</p>
            <Calendar event={event} />
        </div>
    )
}

export default EventDetail;
