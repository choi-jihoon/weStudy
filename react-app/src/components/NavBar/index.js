
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import LoginFormModal from '../auth/LoginFormModal';
import SignUpFormModal from '../auth/SignUpFormModal';
import DropdownMenu from './DropdownMenu';
import CreateGroupModal from '../StudyGroups/CreateGroupModal';

import './NavBar.css';

const NavBar = () => {
  const user = useSelector(state => state.session.user);

  let sessionLinks;
  let userMenu;

  if (user) {
    userMenu = (
      <>
        <div>
          Welcome, {user.username}!
        </div>
        <div className='profile-pic-div user-profile-nav'>
          <img className='profile-pic' src={user.image} alt={user.username}></img>
        </div>
      </>
    )

    sessionLinks = (
      <ul className='dashboard-nav-links'>
        <li>
          <NavLink to='/' exact={true} activeClassName='active'>
            Home
          </NavLink>
        </li>
        {/* <li>
          <NavLink to='/whiteboard' exact={true} activeClassName='active'>
            Whiteboard
          </NavLink>
        </li> */}
        {/* <li>
          <LogoutButton />
        </li> */}
        <DropdownMenu title={userMenu} items={[<CreateGroupModal />, <LogoutButton />]} />
        {/* <li className='user-profile-nav'>
          {user &&
            <>
              <div>
                Welcome, {user.username}!
              </div>
              <div className='profile-pic-div'>
                <img className='profile-pic' src={user.image} alt={user.username}></img>
              </div>
            </>
          }
        </li> */}
      </ul>
    )
  } else {
    sessionLinks = (
      <ul className='splash-page-nav-links'>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
      </ul>
    )
  }

  return (
    <nav>
      {sessionLinks}
    </nav>
  );
}

export default NavBar;
