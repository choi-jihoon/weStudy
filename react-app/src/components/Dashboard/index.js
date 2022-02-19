import { Route, Switch, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { io } from 'socket.io-client';

import StudyGroupDash from '../StudyGroups/StudyGroupDash';
import NoteDetail from '../StudyGroups/Group/Notes/Note/NoteDetail';
import Chat from '../Chat';
import SideNav from './SideNav';
import StudyGroups from '../StudyGroups';
import { getGroups } from '../../store/groups';
import { getRooms } from '../../store/rooms';
import { getNotes } from '../../store/notes';

import Calendar from '../Calendar';

import './Dashboard.css';

// let socket;

const Dashboard = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const groupsObj = useSelector(state => state.groups);
    const roomsObj = useSelector(state => state.rooms);
    const sessionUser = useSelector(state => state.session.user);

    const [online, setOnline] = useState([])

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

    // useEffect(() => {
    //     socket = io();

    //     // socket.emit('connect', { 'username': sessionUser.username, 'room': group?.group_name})
    //     socket.emit('login', {'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': true})
    //     console.log('connecting', sessionUser.username)
    //     socket.on('login', (online_status) => {
    //         dispatch(getGroups());
    //         console.log(online_status.username, 'LOGGED IN!')
    //     })


    //     return (() => {
    //         console.log('disconnecting from group', sessionUser.username)

    //         // socket.emit('disconnect', { 'username': sessionUser.username, 'room': group?.group_name })
    //         socket.emit('logout', {'id': sessionUser.id, 'username': sessionUser.username, 'room': 'we-study', 'online': false})
    //         socket.on('logout', (online_status) => {
    //             dispatch(getGroups());
    //             console.log(online_status.username, 'LOGGED OUT!')
    //         })
    //         socket.disconnect();
    //     });
    // }, []);


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
                    <Route exact path='/calendar'>
                        <Calendar />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;
