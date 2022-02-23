import logo from '../../assets/images/logo.png';
import SignUpForm2 from './SignUpForm2';
import LoginForm2 from './LoginForm2';
import './SplashPage2.css';

const SplashPage2 = () => {

    return (
        <div className='splash-page-container-2'>
            <div className='title-container-2'>
                <h1 className='title-text-2'>weStudy</h1>
                <img id='logo' src={logo} alt='logo'></img>
            </div>
            <div className='forms-container'>
                <div className='form-container2'>
                    <SignUpForm2 />
                </div>
                <div className='form-container2'>
                    <LoginForm2 />
                </div>
            </div>
        </div>
    )
}

export default SplashPage2;
