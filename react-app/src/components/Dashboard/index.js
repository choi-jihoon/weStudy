import { Switch, Route } from 'react-router-dom';

import NavBar from './NavBar';
import StudyGroups from '../StudyGroups';
import Chat from "../Chat";
import Whiteboard from "../Whiteboard";

const Dashboard = () => {
    return (
        <>
            <NavBar />
            <h1>Dashboard</h1>

            <StudyGroups />

            <Switch>
                <Route exact path='/chat'>
                    <Chat />
                </Route>
                <Route exact path='/whiteboard'>
                    <Whiteboard />
                </Route>
            </Switch>
        </>
    )
}

export default Dashboard;
