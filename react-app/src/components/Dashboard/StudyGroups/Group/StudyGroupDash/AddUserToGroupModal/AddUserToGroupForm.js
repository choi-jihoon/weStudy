import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { addUserToGroup } from '../../../../../../store/groups';

import './AddUserToGroupForm.css';

const AddUserToGroupForm = ({ group, setShowModal }) => {
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);

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

    const handleSearch = async (e) => {
        if (e.target.value === "") {
            setSuggestions([]);
            updateUsername(e)
            return
        }

        updateUsername(e)

        const res = await fetch(`/api/users/${e.target.value}`);

        if (res.ok) {
            const possibleUsers = await res.json();
            setSuggestions(possibleUsers.users);
        }

    }


    useEffect(() => {
        setErrors(errors);
    }, [errors])


    return (
        <form autoComplete='off' onSubmit={handleSubmit} className='form-container add-user-form'>
            <div className='form-element-container'>
                <input
                    className='add-user-input'
                    name="username"
                    type="text"
                    placeholder="Add User by Username"
                    value={username}
                    onChange={handleSearch}
                    required
                />
                <div className='errors-container'>
                    {errors.username ? `${errors.username}` : ""}
                </div>
                {suggestions.length > 0 && (
                    <div className='search-results'>
                        <p>Suggested users:</p>
                        {suggestions.map(suggestion => (
                            <div key={suggestion.id} className='suggestion'>{suggestion.username}</div>
                        ))}
                    </div>
                )}
            </div>
            <button id='add-user' type='submit'>Add</button>
        </form>
    )
}

export default AddUserToGroupForm;
