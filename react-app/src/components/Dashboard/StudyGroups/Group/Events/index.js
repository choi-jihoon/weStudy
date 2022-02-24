import { useParams, useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { getEvents } from "../../../../../store/events";
import { getGroup } from "../../../../../store/groups";
import { getRooms } from "../../../../../store/rooms";
import { getNotes } from "../../../../../store/notes";
import { getAlbums } from "../../../../../store/albums";

import CreateEventModal from "./CreateEventModal";
import EventDetail from "./EventDetail";
import NoEvents from "./NoEvents";

import './Events.css';

const Events = () => {
    const { groupId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const eventsObj = useSelector(state => state.events);
    const groupsObj = useSelector(state => state.groups);
    const sessionUser = useSelector(state => state.session.user);
    const group = groupsObj[groupId];

    const compare = (a, b) => {
        if (new Date(a.start_time) < new Date(b.start_time)) return -1;
        if (new Date(a.start_time) > new Date(b.start_time)) return 1;
        return 0;
    }


    useEffect(() => {
        const fetch = async () => {
            const data = await dispatch(getGroup(groupId));
            if (data && data.errors) {
                return history.push('/');
            }
            else {
                dispatch(getEvents(groupId));
                dispatch(getRooms(groupId));
                dispatch(getNotes(groupId));
                dispatch(getAlbums(groupId));
            }
        };
        fetch();
    }, [dispatch, groupId, history])

    useEffect(() => {
        const checkAccess = (group) => {
            if (group.user_ids.includes(sessionUser.id)) {
                return true;
            }
            else return false;
        }

        if (sessionUser && group) {
            if (!checkAccess(group)) {
                return history.push('/')
            }
        }
    }, [group, sessionUser, history]);


    return (
        <>
            <div className='study-group-title events-title-container'>
                <h2>Upcoming Events for {groupsObj[groupId]?.group_name}
                <CreateEventModal groupId={groupId} />
                </h2>
            </div>
            <div className='events-dash-container'>
                <div className='all-events-container'>
                    {(!eventsObj.byGroupId[groupId] || !(Object.values(eventsObj.byGroupId[groupId])).length) && <NoEvents />}
                    {eventsObj.byGroupId[groupId] && (Object.values(eventsObj.byGroupId[groupId])).sort(compare).map(event => (
                        <EventDetail key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </>
    )

}

export default Events;
