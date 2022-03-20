import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';


const Notifications = () => {

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

export default Notifications;
