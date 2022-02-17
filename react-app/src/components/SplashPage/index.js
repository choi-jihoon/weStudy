import logo from '../../assets/images/logo.png';

import NavBar from '../NavBar';
import Footer from './Footer';
import './SplashPage.css';

const SplashPage = () => {
    return (
        <div className='splash-page-container'>
            <NavBar />
            <div className='title-container'>
                <h4>Start studying together.</h4>
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
