import React from "react";
import { useDispatch } from "react-redux";

import { removeUserFromGroup } from '../../../store/groups';



function RemoveFromGroupForm({ showModal, group, user }) {
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(removeUserFromGroup(group.id, user.id));

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
                        Are you sure you want to remove {user.username} from {group.group_name}?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Remove
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

export default RemoveFromGroupForm;
