import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
import StudyGroupDash from './components/StudyGroups/StudyGroupDash';
import NavBar from './components/NavBar';
import Chat from './components/Chat';
import Whiteboard from './components/Whiteboard';
import NoteDetail from './components/StudyGroups/Group/Notes/Note/NoteDetail';
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path='/'>
          {sessionUser ? <Dashboard /> : <SplashPage />}
        </Route>
        <Route path='/groups/:groupId'>
          <StudyGroupDash />
        </Route>
        <Route path='/notes/:noteId'>
          <NoteDetail />
        </Route>
        <Route exact path='/whiteboard'>
          <Whiteboard />
        </Route>
        <Route path='/rooms/:roomId/chat'>
          <Chat />
        </Route>
        <Route>
          <h1>Page Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
