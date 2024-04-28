import React, { useEffect, useState } from 'react';
import AllUsers from './AllUsers';
import EditUser from './EditUser';
import AddUser from './AddUser';

function ManageUsers(props) {
    const [selectedButton, setSelectedButton] = useState('All Users');
    const [selectedUser, setSelectedUser] = useState({});


    const editUser = (user) => {
        setSelectedButton('Edit User');
        setSelectedUser(user);
    }
    const allUsers = () => {
        setSelectedButton('All Users');
    }

    return (
        <div>
            <h1>Users</h1><br />
            <button 
                style={selectedButton === 'All Users' ? { backgroundColor: 'yellow' } : {}}
                onClick={() => setSelectedButton('All Users')}
            >
                All Users
            </button>
            <button 
                style={selectedButton === 'Add User' ? { backgroundColor: 'yellow' } : {}}
                onClick={() => setSelectedButton('Add User')}
            >
                Add User
            </button>
            <button 
                style={selectedButton === 'Edit User' ? { backgroundColor: 'yellow',display:'inline' } : {display:'none'}}
                onClick={() => setSelectedButton('Edit User')} 
            >
                Edit User
            </button>
            <br />

            {selectedButton === 'All Users' && <AllUsers cb={editUser} />}
            {selectedButton === 'Add User' && <AddUser cb={allUsers} />}
            {selectedButton === 'Edit User' && <EditUser user={selectedUser} cb={allUsers} />}
        </div>
    );
}

export default ManageUsers;