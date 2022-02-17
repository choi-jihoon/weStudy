import { Route, Switch } from 'react-router-dom';

import StudyGroupDash from '../StudyGroups/StudyGroupDash';
import NoteDetail from '../StudyGroups/Group/Notes/Note/NoteDetail';
import Chat from '../Chat';
import SideNav from './SideNav';
import StudyGroups from '../StudyGroups';
import './Dashboard.css';

const Dashboard = () => {
    return (
        <div className='dashboard-container'>
            <SideNav />
            <div className='main-container'>

                <Switch>
                    <Route exact path='/'>
                        <StudyGroups />
                    </Route>
                    <Route path='/groups/:groupId'>
                        <StudyGroupDash />
                    </Route>
                    <Route path='/rooms/:roomId/chat'>
                        <Chat />
                    </Route>
                    <Route path='/notes/:noteId'>
                        <NoteDetail />
                    </Route>
                </Switch>
            </div>
        </div>
    )
}

export default Dashboard;
