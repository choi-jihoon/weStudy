import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestToJoinGroup } from '../../../../store/groups';


const JoinGroupForm = ({ setShowModal }) => {
    const [errors, setErrors] = useState({});
    const [groupName, setGroupName] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // user_id, group_name
        const data = await dispatch(requestToJoinGroup(user.id, groupName))

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

    const updateGroupName = (e) => {
        setErrors({});
        setGroupName(e.target.value);
    }

    const handleSearch = async (e) => {
        if (e.target.value === "") {
            setSuggestions([]);
            updateGroupName(e)
            return
        }

        updateGroupName(e)

        const res = await fetch(`/api/groups/${e.target.value}`);

        if (res.ok) {
            const possibleGroups = await res.json();
            setSuggestions(possibleGroups.groups);
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
                    name="groupName"
                    type="text"
                    placeholder="Search for a Group"
                    value={groupName}
                    onChange={handleSearch}
                    required
                />
                <div className='errors-container'>
                    {errors.group_name ? `${errors.group_name}` : ""}
                </div>
                {suggestions.length > 0 && (
                    <div className='search-results'>
                        <p>Suggested groups:</p>
                        {suggestions.map(suggestion => (
                            <div key={suggestion.id} className='suggestion'>{suggestion.group_name} ({suggestion.owner_name})</div>
                        ))}
                    </div>
                )}
            </div>
            <button id='add-user' type='submit'>Request to Join</button>
        </form>
    )
}

export default JoinGroupForm;
