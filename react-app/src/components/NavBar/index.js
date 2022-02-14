
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;

  if (user) {
    sessionLinks = (
      <>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
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
            <>
              <div className='profile-pic-div'>
                <img className='profile-pic' src={user.image} alt={user.username}></img>
              </div>
              <div>
                {user.username}
              </div>
            </>
          }
        </li>
      </>
    )
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
      </>
    )
  }

  return (
    <nav>
      <ul style={{ display: 'flex' }}>
        {sessionLinks}
      </ul>
    </nav>
  );
}

export default NavBar;
