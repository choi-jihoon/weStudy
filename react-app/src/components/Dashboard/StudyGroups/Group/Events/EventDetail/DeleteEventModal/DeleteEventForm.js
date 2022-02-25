import { useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { deleteEvent } from '../../../../../../../store/events';

toast.configure();

function DeleteEventForm({ showModal, event }) {
    const dispatch = useDispatch();

    const notify = () => {
        toast.error(`Event Deleted!`, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(deleteEvent(event.id));
        notify();

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
                        Are you sure you want to delete <span className='bold'>{event.summary}</span>?
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
