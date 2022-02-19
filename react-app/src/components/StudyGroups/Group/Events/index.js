import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents } from "../../../../store/events";
import { getGroup } from "../../../../store/groups";
import EventDetail from "./EventDetail";
import CreateEventModal from "../../../CreateEventModal";

import './Events.css';

const Events = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();

    const eventsObj = useSelector(state => state.events);
    const groupsObj = useSelector(state => state.groups);

    useEffect(() => {
        dispatch(getGroup(groupId));
        dispatch(getEvents(groupId));
    }, [dispatch, groupId])


    return (
        <div className='study-group-dash-container'>
            <div className='study-group-title-container'>
                <div className='study-group-title events-title-container'>
                    <h1>Upcoming Events for {groupsObj[groupId]?.group_name}</h1>
                    <CreateEventModal groupId={groupId} />
                </div>
            </div>
            <div className='all-events-container'>
                {eventsObj.byGroupId[groupId] && Object.values((eventsObj.byGroupId[groupId])).map(event => (
                    <EventDetail key={event.id} event={event} />
                ))}
            </div>
        </div>
    )

}

export default Events;