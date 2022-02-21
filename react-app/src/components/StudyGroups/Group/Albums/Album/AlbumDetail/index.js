import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { getImages } from '../../../../../../store/images';
import { getRooms } from '../../../../../../store/rooms';
import { getNotes } from '../../../../../../store/notes';
import { getAlbums } from '../../../../../../store/albums';

import CreateImageModal from './Images/CreateImageModal';

import Image from './Images/Image';

import './AlbumDetail.css';


const AlbumDetail = () => {
    const { groupId, albumId } = useParams();
    const dispatch = useDispatch();

    const albums = useSelector(state => state.albums);
    const album = albums.albums[albumId];
    const imagesObj = useSelector(state => state.images);

    useEffect(() => {
        dispatch(getAlbums(groupId));
        dispatch(getImages(albumId));
        dispatch(getRooms(groupId));
        dispatch(getNotes(groupId));
    }, [dispatch, albumId, groupId])

    return(
        <div className='album-container'>
            <div className='album-title-container'>
                <h2 className='album-name'>{album?.title}</h2>
                <CreateImageModal albumId={albumId} />
            </div>
            <div className='album-images-container'>
                {imagesObj.byAlbumId[albumId] && Object.values((imagesObj.byAlbumId[albumId])).map(image => (
                    <Image key={image.id} image={image} />
                ))}
            </div>
        </div>
    )
}

export default AlbumDetail;
