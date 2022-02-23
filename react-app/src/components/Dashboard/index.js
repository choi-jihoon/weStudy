import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { io } from 'socket.io-client';

import AlbumDetail from './StudyGroups/Group/Album/AlbumDetail';
import Chat from './StudyGroups/Group/Room/Chat';
import Events from './StudyGroups/Group/Events';
import NoteDetail from './StudyGroups/Group/Note/NoteDetail';
import SideNav from './SideNav';
import StudyGroupDash from './StudyGroups/Group/StudyGroupDash';
import StudyGroups from './StudyGroups';
import PageNotFound from '../PageNotFound';

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
        // console.log('connecting', sessionUser.username)
        socket.on('login', (status) => {
            dispatch(getGroups());
        });

        socket.on('logout', (status) => {
            dispatch(getGroups());
        })

        return (() => {
            // console.log('disconnecting from group', sessionUser.username)
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
                    <Route exact path='/groups/:groupId/albums/:albumId'>
                        <AlbumDetail />
                    </Route>
                    <Route>
                        <PageNotFound />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;
