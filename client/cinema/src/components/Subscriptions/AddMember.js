import axios from 'axios';
import React, { useState } from 'react';

function AddMember(props) {
    const URL = 'http://127.0.0.1:5000/members/'

    const [member, setMember] = useState({
        name: '',
        email: '',
        city: ''


    })

    const handleChange = (e) => {
        setMember({ ...member, [e.target.name]: e.target.value })
    }

    const handleSave = async () => {
        const token = document.cookie.split('=')[1]
        const { data } = await axios.post(URL, member, { headers: { 'Authorization': `Bearer ${token}` } })

        props.cb('All Members')
    }

    const handleCancel = () => {
        props.cb('All Members')
    }


    return (
        <div>
            Name: <input type='text' name='name' value={member.name} onChange={handleChange} /><br />
            Email: <input type='text' name='email' value={member.email} onChange={handleChange} /><br />
            City: <input type='text' name='city' value={member.city} onChange={handleChange} /><br />
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default AddMember;