import LoginFormModal from '../../auth/LoginFormModal';
import SignUpFormModal from '../../auth/SignUpFormModal';

import './NavBar.css';

const NavBar = () => {
  return (
    <nav>
      <ul className='splash-page-nav-links'>
        <li>
          <LoginFormModal />
        </li>
        <li>
          <SignUpFormModal />
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
