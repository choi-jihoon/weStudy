import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import StudyGroupDash from '../StudyGroups/StudyGroupDash';
import NoteDetail from '../StudyGroups/Group/Notes/Note/NoteDetail';
import Chat from '../Chat';
import SideNav from './SideNav';
import StudyGroups from '../StudyGroups';
import Events from '../StudyGroups/Group/Events';
import { getGroups } from '../../store/groups';

import Calendar from '../Calendar';

import './Dashboard.css';

// let socket;

const Dashboard = () => {
    const dispatch = useDispatch();
    // const location = useLocation();
    // const groupsObj = useSelector(state => state.groups);
    // const roomsObj = useSelector(state => state.rooms);
    // const sessionUser = useSelector(state => state.session.user);

    // const path = location.pathname.split('/');
    // let groupId;
    // if (path[2]) {
    //     groupId = path[2];
    // }

    useEffect(() => {
        dispatch(getGroups());
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
                    <Route exact path='/groups/:groupId/events'>
                        <Events />
                    </Route>
                    <Route exact path='/calendar'>
                        <Calendar />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;
