import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import EventDetail from "./EventDetail";
import CreateEventModal from "../../../CreateEventModal";

const Events = () => {
    const { groupId } = useParams();

    const eventsObj = useSelector(state => state.events);
    console.log('EVENTSOBJ', eventsObj)
    console.log('eventsObj BY GROUP', Object.values(eventsObj.byGroupId[groupId]))

    return (
        <div className='all-events-container'>
            <CreateEventModal groupId={groupId} />
            {eventsObj.byGroupId[groupId] && Object.values((eventsObj.byGroupId[groupId])).map(event => (
                <EventDetail key={event.id} event={event} />
            ))}
        </div>
    )

}

export default Events;
