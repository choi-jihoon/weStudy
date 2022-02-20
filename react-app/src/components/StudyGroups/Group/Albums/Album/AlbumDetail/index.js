import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './AlbumDetail.css';


const AlbumDetail = () => {
    const { albumId } = useParams();

    const albums = useSelector(state => state.albums);
    const album = albums.albums[albumId];

    return(
        <div className='album-container'>
            <div className='album-title-container'>
                <h2 className='album-name'>{album.title}</h2>
            </div>
            <div className='album-images-container'>

            </div>
        </div>
    )
}

export default AlbumDetail;
