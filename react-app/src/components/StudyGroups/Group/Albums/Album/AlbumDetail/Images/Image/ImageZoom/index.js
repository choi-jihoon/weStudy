import './ImageZoom.css';

function ImageZoom({ image }) {

  return (
    <div className='zoomed-container' key={image.id}>
      <img className='zoomed-image' src={image.study_image} alt={image.id} />
    </div>
  );
}

export default ImageZoom;
