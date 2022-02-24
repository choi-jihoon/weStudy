import { useState, useEffect } from 'react';

import logo from '../../assets/images/teallogo.png';
import SignUpForm2 from './SignUpForm2';
import LoginForm2 from './LoginForm2';
import './SplashPage2.css';

const SplashPage2 = () => {

    const [showSignUp, setShowSignUp] = useState(false);

    useEffect(() => {
        if (showSignUp) {
            document.querySelector('.form-container1').classList.remove('hide-signup')
            document.querySelector('.form-container1').classList.add('show-signup')
        } else {
            document.querySelector('.form-container1').classList.remove('show-signup')
            setShowSignUp(false);
        }
    }, [showSignUp]);

    const goToLoginForm = (e) => {
        e.preventDefault();
        setShowSignUp(true);
    }

    const handleBackToSignup = (e) => {
        e.preventDefault();
        document.querySelector('.form-container1').classList.remove('show-signup')
        document.querySelector('.form-container1').classList.add('hide-signup')
        setShowSignUp(false);
    }

    return (
        <div className='splash-page-container-2'>
            <div className='title-container-2'>
                <div className='title-text-container-2'>
                    <h1 className='title-text-2'>weStudy</h1>
                    <img id='logo' src={logo} alt='logo'></img>
                </div>
                <div className='about-links'>
                    <div className='left-container-links'>
                        <div className='developer-name-text'>
                            <p id='developed-by'>Developed by</p>
                            <p id='fiona-choi'>Fiona Choi</p>
                            <div className='github-linkedin'>
                                <a target="_blank" rel="noreferrer noopener"
                                    href='https://github.com/choi-jihoon'>
                                    <i className='fab fa-github' />
                                </a>
                                <a target="_blank" rel="noreferrer noopener"
                                    href='https://www.linkedin.com/in/jihoon-choi-a6967a221/'>
                                    <i className='fab fa-linkedin' />
                                </a>
                            </div>
                        </div>
                        <div className='all-technologies'>
                            <div className='technologies-used'>
                                <ul>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        React
                                    </li>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        Redux
                                    </li>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        JavaScript
                                    </li>
                                </ul>
                            </div>
                            <div className='technologies-used'>
                                <ul>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        Python
                                    </li>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        Flask
                                    </li>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        SQLAlchemy
                                    </li>
                                </ul>
                            </div>
                            <div className='technologies-used'>
                                <ul>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        SocketIO
                                    </li>
                                    <li>
                                        <i className="fas fa-circle"></i>
                                        AWS S3
                                    </li>
                                    {/* <li>
                                        <i className="fas fa-circle"></i>
                                        Google Calendar API
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='forms-container'>
                <div className='current-form-container'>
                    <div className='form-container1'>
                        <div className='form-container2'>
                            <SignUpForm2 goToLoginForm={goToLoginForm} />
                        </div>
                        <div className='form-container2'>
                            <LoginForm2 handleBackToSignup={handleBackToSignup} />
                        </div>
                    </div>
                    <p className='copyright-text'>
                        <a target="_blank" rel="noreferrer noopener"
                            href='https://github.com/choi-jihoon/weStudy'>
                            © 2022 | weStudy
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SplashPage2;
