import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const onLogout = async (e) => {
    history.push('/');
    await dispatch(logout());
  };

  return <div id='logout' onClick={onLogout}><i className="fas fa-sign-out-alt"></i></div>;
};

export default LogoutButton;
