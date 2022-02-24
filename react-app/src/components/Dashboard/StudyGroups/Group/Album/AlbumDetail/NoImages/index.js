import './NoImages.css';

const NoImages = () => {
    return (
        <div className='no-images-container'>
            <p>There are no images for this album yet.</p>
            <p id='second-line'>You can post the first one by clicking the upload button in the top right corner.</p>
        </div>
    )
}

export default NoImages;
