
const EventDetail = ({ event }) => {
    return (
        <div className='event-container'>
            Summary: {event.summary}
            Description: {event.description}
            Start Time: {event.start_time}
            End Time: {event.end_time}
        </div>
    )
}

export default EventDetail;
