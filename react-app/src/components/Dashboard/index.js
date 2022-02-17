import { Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import StudyGroupDash from '../StudyGroups/StudyGroupDash';
import NoteDetail from '../StudyGroups/Group/Notes/Note/NoteDetail';
import Chat from '../Chat';
import SideNav from './SideNav';
import StudyGroups from '../StudyGroups';
import { getGroups } from '../../store/groups';
import { getRooms } from '../../store/rooms';
import { getNotes } from '../../store/notes';

import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const groupsObj = useSelector(state => state.groups);
    const roomsObj = useSelector(state => state.rooms);

    const path = location.pathname.split('/');
    let groupId;
    if (path[2]) {
        groupId = path[2];
    }

    useEffect(() => {
        dispatch(getGroups());
        dispatch(getRooms(groupId));
        dispatch(getNotes(groupId));
    }, [dispatch]);

    return (
        <div className='dashboard-container'>
            <SideNav />
            <div className='main-container'>

                <Switch>
                    <Route exact path='/'>
                        <StudyGroups />
                    </Route>
                    <Route exact path='/groups/:groupId'>
                        <StudyGroupDash />
                    </Route>
                    <Route exact path='/groups/:groupId/rooms/:roomId/chat'>
                        <Chat />
                    </Route>
                    <Route exact path='/groups/:groupId/notes/:noteId'>
                        <NoteDetail />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;
