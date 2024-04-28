import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';



function EditMember(props) {
    const URL = 'http://127.0.0.1:5000/members/'
    const passedMember = useSelector(state => state.selected_member)
    const [member, setMember] = useState(passedMember)


    useEffect(() => {
        setMember(passedMember)
    }, [passedMember])

    useEffect(() => {
        console.log('Member: ',member);
    }, [member])

    const handleChange = (e) => {
        setMember({
            ...member,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = async () => {
        if (window.confirm('Are you sure you want to update this member?') === false) return


        const token = document.cookie.split('=')[1]
        const { data } = await axios.put(`${URL}${passedMember._id}`, member, { headers: { 'Authorization': `Bearer ${token}` } })

        props.cb('All Members')

    }

    const handleCancel = () => {
        props.cb('All Members')
    }

    return (
        <div>
            <h1>Edit Member: {passedMember.name}</h1>
            Full Name: <input name='name' type="text" value={member.name} onChange={handleChange} /><br />
            Email: <input name='email' type="text" value={member.email} onChange={handleChange} /><br />
            City: <input name='city' type="text" value={member.city} onChange={handleChange} /><br />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </div>
    );
}

export default EditMember;