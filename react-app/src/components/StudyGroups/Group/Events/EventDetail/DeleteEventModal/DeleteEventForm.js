import React from "react";
import { useDispatch } from "react-redux";

import { deleteEvent } from '../../../../../../store/events';



function DeleteEventForm({ showModal, event }) {
    const dispatch = useDispatch();
;

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(deleteEvent(event.id));

        showModal(false);
    };

    const handleCancelClick = async (e) => {
        e.preventDefault();
        showModal(false);
    }

    return (
        <div>
            <form className='delete-confirmation-container' onSubmit={handleSubmit}>
                <div className='dc-text-container'>
                    <div className='dc-text'>
                        Are you sure you want to delete this event?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Delete Event
                    </button>
                    <button
                        type='button'
                        onClick={handleCancelClick}
                        className='form-cancel-btn'
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default DeleteEventForm;
