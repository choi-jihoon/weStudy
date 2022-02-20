import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { createImage } from '../../../../../../../../store/images';

const CreateImageForm = ({ setShowModal, albumId }) => {
    const [errors, setErrors] = useState({});
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('album_id', albumId);

        if (image) {
            formData.append('study_image', image);
            setImageLoading(true);
        }

        const data = await dispatch(createImage(formData));
        setImageLoading(false);

        if (data) {
            const errors = {}
            for (let i = 0; i < data.length; i++) {
                const error = data[i].split(": ");
                errors[error[0]] = error[1]
            }
            setErrors(errors);
            setImageLoading(false);
            return;
        }

        setShowModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    useEffect(() => {
        setErrors(errors)
    }, [errors]);


    return (
        <form onSubmit={handleSubmit} className='form-container'>
            <div className="gf-add-image-container">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={updateImage}
                ></input>
                <div className="preview-container group">
                    {image && (
                        <img
                            alt="preview"
                            src={URL.createObjectURL(image)}
                            className="preview-image group"
                        ></img>
                    )}
                </div>
                <label htmlFor="file-upload">
                    {imageLoading ?
                        <i className="fas fa-spinner fa-pulse"></i>
                        :
                        <i className="fas fa-image"></i>
                    }
                </label>
            </div>
            <button id='create-group' type="submit">Post Image</button>
            <button className='cancel-btn' onClick={handleCancelClick}>Cancel</button>
        </form>
    );
};

export default CreateImageForm;
