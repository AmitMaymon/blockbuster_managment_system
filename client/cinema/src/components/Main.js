import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { check_permissions } from '../utils';
import ManageUsers from './Users/ManageUsers';
import Movies from './Movies/Movies';
import Subscriptions from './Subscriptions/Subscriptions';
function Main(props) {

    const isAdmin = useSelector(state => state.isAdmin)
    const viewMovies = useSelector(state => state.view_movies)
    const viewSubscription = useSelector(state => state.view_subscription)
    const createSubscription = useSelector(state => state.create_subscription)
    const createMovie = useSelector(state => state.create_movie)
    const deleteSubscription = useSelector(state => state.delete_subscription)
    const deleteMovie = useSelector(state => state.delete_movie)

    const [selectedTab,setSelectedTab] = useState('Test')



    const disp = useDispatch();
    const nav = useNavigate();

    async function check_login() {
        //    Check for "t" cookie and send it to the server to check if it's valid
        //    If it's valid, update the redux state with the users permissions

        const token = document.cookie.split('=')[1];
        console.log(token)
        if (token) {
            const { data } = await axios.post('http://localhost:5000/login/checkt', { token: token })
            console.log(data);
            if (data.status === 'ok') {
                check_permissions(data.permissions, disp)
                console.log('Logged In')
            } else {
                console.log('Not Logged In')
                nav('/login')
            }

        } else {
            console.log('Not Logged In')
            nav('/login')
        }


    }


    useEffect(() => {
        check_login()
    }, [])

    const resetUserData = () => {
        disp({ type: 'RESET' })
    }


    const handleLogout = () => {

        document.cookie = 't=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';

        resetUserData()
    
        nav('/login')
    }

    const handleNavigation = (e) => {
        if (e.target.innerText === 'Movies') {
            setSelectedTab('Movies')
        } else if (e.target.innerText === 'Subscriptions') {
            setSelectedTab('Subscriptions')
        } else if (e.target.innerText === 'Users Managment') {
            setSelectedTab('Users')
        }
    }

    const cb = (text) => {
        setSelectedTab(text)
    }


    return (
        <div>
            <h1>Movies - Subscriptions Web Site</h1><br />

            <div className="navigation">
                <button style={selectedTab == 'Movies' ? {backgroundColor:'yellow'}: {}} onClick={handleNavigation}>Movies</button>
                <button style={selectedTab == 'Subscriptions' ? {backgroundColor:'yellow'}: {}} onClick={handleNavigation}>Subscriptions</button>
                {
                    isAdmin &&
                    <button style={selectedTab == 'Users' ? {backgroundColor:'yellow'}: {}} onClick={handleNavigation}>Users Managment</button>

                }
                <button onClick={handleLogout}>Logout</button>

            </div> <br />

            {
                selectedTab === 'Test' &&
                <div style={{ border: 'black 2px solid' }}>
                <br /><br />
                <h1>For Testing</h1><br />
                <h2>Permissions</h2>
                <ul>
                    {viewMovies && <li>View Movies</li>}
                    {viewSubscription && <li>View Subscription</li>}
                    {createSubscription && <li>Create Subscription</li>}
                    {createMovie && <li>Create Movie</li>}
                    {deleteSubscription && <li>Delete Subscription</li>}
                    {deleteMovie && <li>Delete Movie</li>}
                </ul>


            </div>


            }

            {
                selectedTab === 'Users' &&
                <ManageUsers />
            }

            {
                selectedTab === 'Movies' &&
                <Movies mainCB={cb} />
            }

            {
                selectedTab === 'Subscriptions' &&
                <Subscriptions mainCB={cb} />
            }
            
        </div>
    );
}

export default Main;