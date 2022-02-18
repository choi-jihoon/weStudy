import { Route, Switch, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import StudyGroupDash from '../StudyGroups/StudyGroupDash';
import NoteDetail from '../StudyGroups/Group/Notes/Note/NoteDetail';
import Chat from '../Chat';
import SideNav from './SideNav';
import StudyGroups from '../StudyGroups';
import { getGroups } from '../../store/groups';
import { getRooms } from '../../store/rooms';
import { getNotes } from '../../store/notes';

import './Dashboard.css';

let socket;

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const groupsObj = useSelector(state => state.groups);
    const roomsObj = useSelector(state => state.rooms);
    const sessionUser = useSelector(state => state.session.user);

    const path = location.pathname.split('/');
    let groupId;
    if (path[2]) {
        groupId = path[2];
    }

    useEffect(() => {
        dispatch(getGroups());
        // dispatch(getRooms(groupId));
        // dispatch(getNotes(groupId));
    }, [dispatch]);

    useEffect(() => {
        socket = io();

        // socket.emit('connect', { 'username': sessionUser.username, 'room': group?.group_name})
        socket.emit('login', {'username': sessionUser.username, 'room': 'we-study'})
        console.log('connecting', sessionUser.username)

        return (() => {
            console.log('disconnecting from group', sessionUser.username)

            // socket.emit('disconnect', { 'username': sessionUser.username, 'room': group?.group_name })
            socket.emit('logout', {'username': sessionUser.username, 'room': 'we-study'})
            socket.disconnect();
        });
    }, []);


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
