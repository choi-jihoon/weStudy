import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../../auth/LogoutButton';
import LoginFormModal from '../../auth/LoginFormModal';
import SignUpFormModal from '../../auth/SignUpFormModal';
import DropdownMenu from './DropdownMenu';
import CreateGroupModal from '../../Dashboard/StudyGroups/CreateGroupModal';

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
        <DropdownMenu title={userMenu} items={[<CreateGroupModal />, <LogoutButton />]} />
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
