import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className='page-not-found'>
            <h2 id='pnf-text'>Nothing exists on this page.</h2>
            <h3>(Not even you.... woah.)</h3>
            <Link to='/'>
                <div id='return'>Return to Existence</div>
            </Link>
        </div>
    )
}

export default PageNotFound;
