import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import {useDispatch} from 'react-redux';
import { check_permissions } from '../utils';

function SignUp(props) {
    const disp = useDispatch();
    const nav = useNavigate();
    const URL = 'http://127.0.0.1:5000/login/'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorHandler, setErrorHandler] = useState('');

    function handleChange(e) {
        if (e.target.name === 'username') {
            setUsername(e.target.value);
        } else if (e.target.name === 'password') {
            setPassword(e.target.value);
        }

    }

    const handleRegister = async () => {
        const obj = {
            username: username,
            password: password
        };

        const { data } = await axios.post(`${URL}signup`, obj)
        console.log(data)
        if (data.status == 'ok') {
            setErrorHandler('')
            const decoded = jwt_decode(data.token)
            check_permissions(decoded.permissions,disp)
            document.cookie = `t=${data.token}`;
            console.log('Account Created')
            nav('/')
        } else {
            setErrorHandler('Wrong Username or User Already Exists')
        }
    }

        return (
            <div>
                <h1>Create an Account</h1>
                Username <input type="text" name='username' onChange={handleChange} /><br />
                Password <input type="text" name='password' onChange={handleChange} /><br />
                <button onClick={handleRegister}>Create</button><br />
                <h2 style={{color:'red'}}>{errorHandler}</h2>
            </div>
        );
   
}

export default SignUp;