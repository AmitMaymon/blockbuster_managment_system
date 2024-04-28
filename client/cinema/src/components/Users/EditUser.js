import React, { useEffect, useState } from 'react';
import axios from 'axios';




function EditUser(props) {
    const [user, setUser] = useState(props.user)
    const URL = 'http://127.0.0.1:5000/users/'
    const [permissions, setPermissions] = useState({
        viewSub: user.permissions.includes('View Subscriptions'),
        createSub: user.permissions.includes('Create Subscriptions'),
        deleteSub: user.permissions.includes('Delete Subscriptions'),
        updateSub: user.permissions.includes('Update Subscription'),
        viewMovies: user.permissions.includes('View Movies'),
        createMovies: user.permissions.includes('Create Movies'),
        deleteMovies: user.permissions.includes('Delete Movies'),
        updateMovies: user.permissions.includes('Update Movies')
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


    const handleCheckboxChange = (event) => {
        setPermissions({ ...permissions, [event.target.name]: event.target.checked })

        // if(event.target.name === 'createSub' || event.target.name === 'deleteSub' || event.target.name === 'updateSub'){
        //     setPermissions({...permissions,viewSub:true})
        // }
        // if(event.target.name === 'createMovies' || event.target.name === 'deleteMovies' || event.target.name === 'updateMovies'){
        //     setPermissions({...permissions,viewMovies:true})
        // }

    };

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


    useEffect(() => {
        console.log(user)
    }, [])


    const handleUpdate = async () => {
        let updatedUser = { ...user };
        updatedUser.permissions = Object.entries(permissions)
            .filter(([key, value]) => value)
            .map(([key, value]) => key);


        //changes the permissions to the server format
        updatedUser.permissions = updatedUser.permissions.map((permission) => {
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
        updatedUser.userInfo.sessionTimeOut = parseInt(updatedUser.userInfo.sessionTimeOut);
        console.log("updatedUser: ",updatedUser);
        if (updatedUser._id === '6601b12634ddaec8db84e6be') {
            alert("You can't edit this user");
            props.cb()
            return;
        }

        try {
            const response = await axios.put(`${URL}${user._id}`, updatedUser, {
                headers: {
                    'Authorization': `Bearer ${document.cookie.split('=')[1]}`
                }
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
        props.cb()
    }

    const handleCancel = () => {
        props.cb()
    }

    const handleResetPassword = async () => {
        let object = {...user}
        object.password = 'newly_created'
        const token = document.cookie.split('=')[1]
        const {data} = await axios.put(`${URL}${user._id}`, object, { headers: { 'Authorization': `Bearer ${token}` } })   
        console.log(data);
    }


    return (
        <div>
            <h1>Edit User: {user.userInfo.FirstName} {user.userInfo.LastName}</h1><br />
            First Name: <input type='text' value={user.userInfo.FirstName} onChange={handleChange} name='fname' /><br />
            Last Name: <input type='text' value={user.userInfo.LastName} onChange={handleChange} name='lname' /><br />
            Username: <input type='text' value={user.username} onChange={handleChange} name='username' /><br />
            Session Time Out (Minutes): <input type='number' onChange={handleChange} name='sessionTO' value={user.userInfo.sessionTimeOut} /><br />
            Created at: {user.userInfo.createdDate}<br />
            Permissions: <br />
            <input type="checkbox" name="viewSub" onChange={handleCheckboxChange} checked={permissions.viewSub} />View Subscriptions<br />
            <input type="checkbox" name="createSub" onChange={handleCheckboxChange} checked={permissions.createSub} />Create Subscriptions<br />
            <input type="checkbox" name="deleteSub" onChange={handleCheckboxChange} checked={permissions.deleteSub} />Delete Subscriptions<br />
            <input type="checkbox" name="updateSub" onChange={handleCheckboxChange} checked={permissions.updateSub} />Update Subscription <br />
            <input type="checkbox" name="viewMovies" onChange={handleCheckboxChange} checked={permissions.viewMovies} />View Movies<br />
            <input type="checkbox" name="createMovies" onChange={handleCheckboxChange} checked={permissions.createMovies} />Create Movies<br />
            <input type="checkbox" name="deleteMovies" onChange={handleCheckboxChange} checked={permissions.deleteMovies} />Delete Movies<br />
            <input type="checkbox" name="updateMovies" onChange={handleCheckboxChange} checked={permissions.updateMovies} />Update Movies<br />
            <br />

            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
            <button onClick={handleResetPassword}>Reset Password</button>
        </div>
    );
}

export default EditUser;