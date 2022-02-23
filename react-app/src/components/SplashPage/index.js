import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

import logo from '../../assets/images/logo.png';
import { wacky } from '../../assets/images/wacky';

import NavBar from './NavBar';
import Footer from './Footer';

import './SplashPage.css';

const SplashPage = () => {

    const history = useHistory();

    console.log(wacky);

    useEffect(() => {
        history.push('/');
    }, [history])

    return (
        <div className='splash-page-container'>
            <NavBar />
            <div className='title-container'>
                <h4>Studying's better together.</h4>
                <div className='title-image'>
                    <h1>weStudy</h1>
                    <img src={logo} alt='logo'></img>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default SplashPage;
