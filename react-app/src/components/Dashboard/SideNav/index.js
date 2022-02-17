import { useSelector } from "react-redux";

import DropdownMenu from "../../NavBar/DropdownMenu";
import CreateGroupModal from "../../StudyGroups/CreateGroupModal";
import LogoutButton from "../../auth/LogoutButton";

const SideNav = () => {
    const user = useSelector(state => state.session.user);
    const userMenu = (
        <>
          <div>
            Welcome, {user.username}!
          </div>
          <div className='profile-pic-div user-profile-nav'>
            <img className='profile-pic' src={user.image} alt={user.username}></img>
          </div>
        </>
      )

    return (
        <div className='side-nav-container'>
            <h2>SIDE NAV</h2>
            <DropdownMenu title={userMenu} items={[<CreateGroupModal />, <LogoutButton />]} />
        </div>
    )
}

export default SideNav;
