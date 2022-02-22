import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getImages } from '../../../../../../store/images';
import { getRooms } from '../../../../../../store/rooms';
import { getNotes } from '../../../../../../store/notes';
import { getAlbums } from '../../../../../../store/albums';

import CreateImageModal from './Image/CreateImageModal';
import DeleteImageModal from './Image/DeleteImageModal';

import Image from './Image';

import './AlbumDetail.css';


const AlbumDetail = () => {
    const { groupId, albumId } = useParams();
    const dispatch = useDispatch();

    const albums = useSelector(state => state.albums);
    const album = albums.albums[albumId];
    const groups = useSelector(state => state.groups);
    const group = groups[groupId];
    const imagesObj = useSelector(state => state.images);
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        dispatch(getAlbums(groupId));
        dispatch(getImages(albumId));
        dispatch(getRooms(groupId));
        dispatch(getNotes(groupId));
    }, [dispatch, albumId, groupId])

    return (
        <>
            <div className='album-title-container'>
                <h2 className='album-name'>{album?.title}
                <CreateImageModal albumId={albumId} />
                </h2>
            </div>
            <div className='album-container'>
                <div className='album-images-container'>
                    {imagesObj.byAlbumId[albumId] && Object.values((imagesObj.byAlbumId[albumId])).map(image => (
                        <div className='image-container' key={image.id}>
                            <Image image={image} />
                            {(user.id === image.user_id || user.id === group.owner_id) &&
                            <DeleteImageModal image={image} />
                            }
                        </div>
                    )).reverse()}
                    <li className='last-li'></li>
                </div>
            </div>
        </>
    )
}

export default AlbumDetail;
