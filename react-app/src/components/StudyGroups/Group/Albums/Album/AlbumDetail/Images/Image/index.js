const Image = ({ image }) => {
    return (
        <div className='image-container'>
            <img src={image.study_image} alt={image.id}></img>
        </div>
    )
}

export default Image;
