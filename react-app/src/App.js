import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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
        <Route path='/'>
          {sessionUser ? <Dashboard /> : <SplashPage />}
        </Route>
        {/* <Route exact path='/whiteboard'>
          <Whiteboard />
        </Route> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
