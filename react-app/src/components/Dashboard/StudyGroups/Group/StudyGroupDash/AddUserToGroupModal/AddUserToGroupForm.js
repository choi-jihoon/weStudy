import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addUserToGroup } from '../../../../../../store/groups';

import './AddUserToGroupForm.css';

const AddUserToGroupForm = ({ group, setShowModal }) => {
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await dispatch(addUserToGroup(group.id, username))

        if (data) {
			const errors = {}
			for (let i = 0; i < data.length; i++) {
				const error = data[i].split(": ");
				errors[error[0]] = error[1]
			}
			setErrors(errors)
			return;
		}
        setShowModal(false);
    }

    const updateUsername = (e) => {
        setErrors({});
        setUsername(e.target.value);
    }

    useEffect(() => {
        setErrors(errors);
    }, [errors])


    return (
        <form onSubmit={handleSubmit} className='form-container add-user-form'>
            <div className='form-element-container'>
				<input
                    className='add-user-input'
					name="username"
					type="text"
					placeholder="Add User by Username"
					value={username}
					onChange={updateUsername}
					required
				/>
				<div className='errors-container'>
					{errors.username ? `${errors.username}` : ""}
				</div>
			</div>
            <button id='add-user' type='submit'>Add</button>
        </form>
    )
}

export default AddUserToGroupForm;