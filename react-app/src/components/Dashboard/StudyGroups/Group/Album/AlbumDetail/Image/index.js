import { useState } from 'react';

import { Modal } from '../../../../../../../context/Modal';
import ImageZoom from './ImageZoom';

import './Image.css';

const Image = ({ image }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <img className='grid-image'
                onClick={() => setShowModal(true)}
                src={image.study_image} alt={image.id}></img>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <ImageZoom image={image} />
                </Modal>
            )}
        </>

    )
}

export default Image;
