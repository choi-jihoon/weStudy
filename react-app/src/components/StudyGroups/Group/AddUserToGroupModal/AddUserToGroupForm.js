import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const AddUserToGroupForm = () => {
    const [errors, setErrors] = useState({});
    const [username, setUsername] = useState('');

    const user = useSelector(state => state.session.user);

    const dispatch = useDispatch();


    return <h1>Add User To Group</h1>
}

export default AddUserToGroupForm;
