import { useSelector } from 'react-redux';

const Footer = () => {
    const user = useSelector(state => state.session.user);

    return (
        <footer className={!user ? 'splash-page-footer' : 'logged-in-footer'}>
        {!user &&
            <ul className="technologies">
                <li>React</li>
                <li>Redux</li>
                <li>Javascript</li>
                <li>Python</li>
                <li>Flask</li>
                <li>HTML5</li>
                <li>CSS</li>
                <li>Docker</li>
                <li>SocketIO</li>
                <li>AWS S3</li>
                <li>Google Calendar API</li>
            </ul>
        }
        <ul className='copyright'>
            <li className='footer-text'>
                <a target="_blank" rel="noreferrer noopener"
                    href='https://github.com/choi-jihoon/weStudy'>
                    © 2022 | weStudy
                </a>
            </li>
            <ul className='about-me'>
                <li className='footer-text'>
                    Fiona Choi
                </li>
                <li>
                    <a target="_blank" rel="noreferrer noopener"
                        href='https://github.com/choi-jihoon'>
                        <i className='fab fa-github' />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer noopener"
                        href='https://www.linkedin.com/in/jihoon-choi-a6967a221/'>
                        <i className='fab fa-linkedin' />
                    </a>
                </li>
            </ul>
        </ul>
    </footer>
    )
}

export default Footer;
