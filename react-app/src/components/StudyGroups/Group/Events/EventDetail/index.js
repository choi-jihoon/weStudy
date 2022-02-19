
const EventDetail = ({ event }) => {
    const offset = new Date().getTimezoneOffset() / 60
    const local = (new Date(event.start_time).setHours((new Date(event.start_time)).getHours() + offset))
    const what = new Date(local).toISOString()

    return (
        <div className='event-container'>
            {/* Summary: {event.summary}
            Description: {event.description}
            Start Time: {event.start_time}
            End Time: {event.end_time} */}
            Hello {event.start_time}
            <div>
                Second {new Date(event.start_time).toISOString()}
            </div>
            <div>
                {new Date().getTimezoneOffset() / 60}
            </div>
            <div>
                {/* {(new Date(event.start_time).setHours((new Date(event.start_time)).getHours() + offset))} */}
                {what}
            </div>
        </div>
    )
}

export default EventDetail;
