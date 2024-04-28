import axios from 'axios';
import React, { useEffect, useState } from 'react';

function AllUsers(props) {
    const URL = 'http://127.0.0.1:5000/users/'
    const [users,setUsers] = useState([])

    const fetchAllUsers = async () => {
        const token = document.cookie.split('=')[1]
        const {data} = await axios.get(URL,{headers:{'Authorization':`Bearer ${token}`}})
        if (data){
            setUsers(data)
        }
        console.log(data)
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    const handleEdit = (user) => {
        // console.log(user)
        props.cb(user)
    }

    const handleDelete = async(user) => {
        if(user._id === '6601b12634ddaec8db84e6be'){    
            alert("You can't delete this user");
            return;
        }
        if(window.confirm('Are you sure you want to delete this user?') === false){
            return
        }
        
        const token = document.cookie.split('=')[1]
        const {data} = await axios.delete(`${URL}${user._id}`,{headers:{'Authorization':`Bearer ${token}`}})
        console.log(data);
        for (let i = 0; i < users.length; i++) {
            if (users[i]._id === user._id) {
                users.splice(i, 1);
                setUsers([...users]);
                break;
            }
        }
    }



    return (


        <div>
            {users.map((user,index) => {
                return (
                    <div style={{border:'black 1px solid'}} key={index}>
                        <b>Name:</b> {user.userInfo.FirstName} {user.userInfo.LastName} <br />
                        <b>Username:</b> {user.username} <br />
                        <b>Session Time Out (Minutes): </b> {user.userInfo.sessionTimeOut} <br />
                        <b>Created </b>At: {user.userInfo.createdDate} <br />
                        <b>Permissions:</b> {user.permissions.map((permission,index) => {
                            return (
                                <div key={index}>
                                    {permission}
                                </div>
                            )
                        })} <br />

                        <button onClick={() => handleEdit(user)}>Edit</button>   
                        {
                            user._id === '6601b12634ddaec8db84e6be' ? <button disabled onClick={() => handleDelete(user)}>Delete</button> : 
                            <button onClick={() => handleDelete(user)}>Delete</button>
                        }
                    </div>
                )
            })}

        </div>
    );
}

export default AllUsers;