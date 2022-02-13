
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  return (
    <nav>
      <ul style={{ display: 'flex' }}>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/chat' exact={true} activeClassName='active'>
            Chat
          </NavLink>
        </li>
        <li>
          <NavLink to='/whiteboard' exact={true} activeClassName='active'>
            Whiteboard
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
        <li>
          {user &&
          <p>
            <img src={user.image} alt={user.username}></img>
            {user.username}
          </p>
          }
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
