import React, { useEffect, useState } from 'react';
import axios from 'axios'


function AddUser(props) {
    const URL = 'http://127.0.0.1:5000/users/'

    const [permissions, setPermissions] = useState({
        viewSub: false,
        createSub: false,
        deleteSub: false,
        updateSub: false,
        viewMovies: false,
        createMovies: false,
        deleteMovies: false,
        updateMovies: false
    })
    const [user, setUser] = useState({
        username: '',
        userInfo: {
            FirstName: '',
            LastName: '',
            sessionTimeOut: '',



        },
        password: 'newly_created'
    })






    useEffect(() => {
        let newPermissions = { ...permissions };
        if (permissions.createSub || permissions.deleteSub || permissions.updateSub) {
            newPermissions.viewSub = true;
        }
        if (permissions.createMovies || permissions.deleteMovies || permissions.updateMovies) {
            newPermissions.viewMovies = true;
        }


        if (JSON.stringify(newPermissions) !== JSON.stringify(permissions)) {
            setPermissions(newPermissions);
        }
    }, [permissions]);



    const handleChange = (e) => {
        switch (e.target.name) {
            case 'fname':
                setUser({ ...user, userInfo: { ...user.userInfo, FirstName: e.target.value } })
                break;
            case 'lname':
                setUser({ ...user, userInfo: { ...user.userInfo, LastName: e.target.value } })

                break;
            case 'username':
                setUser({ ...user, username: e.target.value })

                break;
            case 'sessionTO':
                setUser({ ...user, userInfo: { ...user.userInfo, sessionTimeOut: e.target.value } })

                break;
            default:
                break;
        }
    }


    const handleCheckboxChange = (e) => {
        setPermissions({ ...permissions, [e.target.name]: e.target.checked })
    }

    const handleSave = async () => {
        let newUser = { ...user };
        newUser.permissions = Object.entries(permissions)
            .filter(([key, value]) => value)
            .map(([key, value]) => key);


        //changes the permissions to the server format
        if(window.confirm('Are you sure you want to add this user?') === false){
            return
        }
        newUser.permissions = newUser.permissions.map((permission) => {
            switch (permission) {
                case 'viewSub':
                    return 'View Subscriptions';
                case 'createSub':
                    return 'Create Subscriptions';
                case 'deleteSub':
                    return 'Delete Subscriptions';
                case 'updateSub':
                    return 'Update Subscription';
                case 'viewMovies':
                    return 'View Movies';
                case 'createMovies':
                    return 'Create Movies';
                case 'deleteMovies':
                    return 'Delete Movies';
                case 'updateMovies':
                    return 'Update Movies';
                default:
                    return permission;
            }
        });
        newUser.userInfo.sessionTimeOut = parseInt(newUser.userInfo.sessionTimeOut);
        console.log(newUser)
        const token = document.cookie.split('=')[1]
        const { data } = await axios.post(URL, newUser, { headers: { 'Authorization': `Bearer ${token}` } })
        console.log(data);
        props.cb()


    }

    const handleCancel = () => {
        props.cb()
    }




    return (
        <div>
            <h1>Add New User</h1><br />
            First Name: <input type='text' onChange={handleChange} name='fname' /><br />
            Last Name: <input type='text' onChange={handleChange} name='lname' /><br />
            Username: <input type='text' onChange={handleChange} name='username' /><br />
            Session Time Out (Minutes): <input type='number' onChange={handleChange} name='sessionTO' /><br />
            {/* Created at: {user.userInfo.createdDate}<br /> */}
            Permissions: <br />
            <input type="checkbox" name="viewSub" onChange={handleCheckboxChange} checked={permissions.viewSub} />View Subscriptions<br />
            <input type="checkbox" n name="createSub" onChange={handleCheckboxChange} checked={permissions.createSub} />Create Subscriptions<br />
            <input type="checkbox" name="deleteSub" onChange={handleCheckboxChange} checked={permissions.deleteSub}/>Delete Subscriptions<br />
            <input type="checkbox" name="updateSub" onChange={handleCheckboxChange} checked={permissions.updateSub} />Update Subscription <br />
            <input type="checkbox" name="viewMovies" onChange={handleCheckboxChange} checked={permissions.viewMovies} />View Movies<br />
            <input type="checkbox" name="createMovies" onChange={handleCheckboxChange} checked={permissions.createMovies}/>Create Movies<br />
            <input type="checkbox" name="deleteMovies" onChange={handleCheckboxChange} chcked={permissions.deleteMovies} />Delete Movies<br />
            <input type="checkbox" name="updateMovies" onChange={handleCheckboxChange} checked={permissions.updateMovies} />Update Movies<br />
            <br />

            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default AddUser;