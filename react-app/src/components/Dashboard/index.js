import { Route, Switch } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import StudyGroupDash from '../StudyGroups/StudyGroupDash';
import NoteDetail from '../StudyGroups/Group/Notes/Note/NoteDetail';
import Chat from '../Chat';
import SideNav from './SideNav';
import StudyGroups from '../StudyGroups';
import Events from '../StudyGroups/Group/Events';
import { getGroups } from '../../store/groups';

import './Dashboard.css';

let socket;

const Dashboard = () => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getGroups());
    }, [dispatch]);

    useEffect(() => {
        socket = io();

        socket.emit('login', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': true })
        console.log('connecting', sessionUser.username)
        socket.on('login', (online_status) => {
            dispatch(getGroups());
            console.log(online_status.username, 'LOGGED IN!')
        });

        socket.on('logout', (online_status) => {
            console.log(online_status.username, 'LOGGED OUT!')
            dispatch(getGroups());
        })

        return (() => {
            console.log('disconnecting from group', sessionUser.username)
            socket.emit('logout', { 'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': false })
            socket.disconnect();
        });
    }, [dispatch, sessionUser.id, sessionUser.username]);

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
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;
