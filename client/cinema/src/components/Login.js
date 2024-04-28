import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { check_permissions } from '../utils';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';



function Login(props) {
    const nav = useNavigate();
    const disp = useDispatch();
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

    const handleLogin = async () => {
        const obj = {
            username: username,
            password: password
        };


        const {data} = await axios.post(URL,obj);

        console.log(data);
        if (data.status == 'ok'){
            setErrorHandler('')
            const decoded = jwt_decode(data.token)
            console.log(decoded);

            check_permissions(decoded.permissions,disp)
            console.log('Logged In')
            document.cookie = `t=${data.token}`;
            nav('/')
            
        }else{
            setErrorHandler('Invalid Username or Password');
        }

    };

    return (

        <div>
            <h1>Login Page</h1>
            Username: <input type="text" name='username' onChange={handleChange} /> <br />
            Password: <input type="text" name='password' onChange={handleChange} />  <br />
            <button onClick={handleLogin}>Login</button><br />
            New User?: <Link to={'/signup'}>Create Account</Link><br />
            <h2 style={{color:'red'}}>{errorHandler}</h2>
        </div>
    );
}

export default Login;