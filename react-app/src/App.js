import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpFormModal from './components/auth/SignUpFormModal';
import NavBar from './components/Dashboard/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Chat from './components/Chat';
import Whiteboard from './components/Whiteboard';
import SplashPage from './components/SplashPage';
import Dashboard from './components/Dashboard';
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
      <Switch>
        <Route exact path='/'>
          {sessionUser ? <Dashboard /> : <SplashPage />}
        </Route>
        <ProtectedRoute path='/chat' exact={true} >
          <Chat />
        </ProtectedRoute>
        <ProtectedRoute path='/whiteboard' exact={true} >
          <Whiteboard />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
