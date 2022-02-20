import DeleteImageModal from "../DeleteImageModal";

import './Image.css';

const Image = ({ image }) => {
    return (
        <div className='image-and-btns-container'>
            <div className='delete-image-btn-container'>
                <DeleteImageModal image={image} />
            </div>
            <div className='image-container'>
                <img src={image.study_image} alt={image.id}></img>
            </div>
        </div>
    )
}

export default Image;
