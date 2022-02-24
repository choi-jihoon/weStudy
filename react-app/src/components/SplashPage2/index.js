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
                </div>
            </div>
        </div>
    )
}

export default SplashPage2;
