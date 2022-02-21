import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { leaveStudyGroup } from '../../../../../../store/groups';

function LeaveGroupForm({ showModal, group }) {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(leaveStudyGroup(group.id));

        showModal(false);
        history.push('/');
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
                        Are you sure you want to leave <span className='bold'>{group.group_name}</span>?
                    </div>
                </div>
                <div className='dc-btn-container'>
                    <button
                        type="submit"
                        className='form-delete-btn'
                    >
                        Leave
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

export default LeaveGroupForm;
