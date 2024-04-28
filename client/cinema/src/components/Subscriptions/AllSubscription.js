import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function AllSubscription(props) {
    const URL = 'http://127.0.0.1:5000/members/'
    const subsURL = 'http://127.0.0.1:5000/subs/'
    const moviesURL = 'http://127.0.0.1:5000/movies/'
    const [members, setMembers] = useState([])
    const [subs, setSubs] = useState([])
    const [movies, setMovies] = useState([])
    const [selectedMovie, setSelectedMovie] = useState('')
    const [selectedMovieName, setSelectedMovieName] = useState('')
    const dispatch = useDispatch()

    const updateSubscription = useSelector(state => state.update_subscription)
    const deleteMember = useSelector(state => state.delete_subscription)
    const createSubscription = useSelector(state => state.create_subscription)
    const [addingMovieMemberId, setAddingMovieMemberId] = useState(null);

    function formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const today = formatDate(new Date());


    const handleAddMovie = (memberId, cond) => {
        if (cond) {
            setAddingMovieMemberId(memberId);
        } else {
            setAddingMovieMemberId(null);
        }
    }





    const fetchAllMembers = async () => {

        const token = document.cookie.split('=')[1]
        const { data } = await axios.get(URL, { headers: { 'Authorization': `Bearer ${token}` } })
        setMembers(data)


    }
    const fetchMembersSubscriptions = async (id) => {
        const token = document.cookie.split('=')[1]
        const { data } = await axios.get(subsURL, { headers: { 'Authorization': `Bearer ${token}` } })
        setSubs(data)
    }

    const fetchAllMovies = async () => {
        const token = document.cookie.split('=')[1]
        const { data } = await axios.get(moviesURL, { headers: { 'Authorization': `Bearer ${token}` } })
        setMovies(data)
    }


    const handleSubscribe = async (memberId, memberName) => {
        if (selectedMovie == '') {
            alert('Please select a movie')
            return
        }
        const token = document.cookie.split('=')[1]
        const { data } = await axios.post(subsURL, { memberId, memberName, movieId: selectedMovie, movieName: selectedMovieName, date: today }, { headers: { 'Authorization': `Bearer ${token}` } })
        console.log(data)
        fetchMembersSubscriptions()
    }

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this member?') === false) return
        const token = document.cookie.split('=')[1]
        const { data } = await axios.delete(`${URL}${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
        fetchAllMembers()
    }


    useEffect(() => {
        fetchAllMembers()
        fetchAllMovies()

    }, []);

    useEffect(() => {
        fetchMembersSubscriptions()
    }, [members]);

    useEffect(() => {
        movies.map((movie, index) => {
            if (movie._id === selectedMovie) {
                setSelectedMovieName(movie.name)
            }
        })

    }, [selectedMovie]);






    return (
        <div>

            {
                members?.map((member, index) => {
                    return (
                        <div key={index} style={{ border: '1px solid black' }}>
                            <h1>{member.name}</h1>
                            <h4>Email : {member.email}</h4>
                            <h4>City : {member.city}</h4>
                            {
                                updateSubscription &&
                                <button onClick={() => { props.cb('Edit Member', member) }}>Edit</button>
                            }

                            {
                                deleteMember &&
                                <button onClick={() => { handleDelete(member._id) }}>Delete</button>
                            }

                            <h2>Movies Watched</h2>
                            {
                                createSubscription &&

                                <button onClick={() => { handleAddMovie(member._id, true) }}>Subscribe to a new movie</button>
                            }
                            <br />
                            {
                                addingMovieMemberId == member._id && <div>
                                    Add a new Movie <br />
                                    <select onChange={(e) => { setSelectedMovie(e.target.value) }} name="" id="">
                                        <option disabled selected value="default">Select a Movie</option>
                                        {
                                            movies?.map((movie, index) => {
                                                return (
                                                    <option key={index} value={movie._id}>{movie.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                    <input readOnly type="text" value={today} />
                                    <br />
                                    <button onClick={() => { handleSubscribe(member._id, member.name) }}>Subscribe</button>
                                </div>
                            }
                            <ul>
                                {

                                    subs?.map((sub, index) => {
                                        if (sub.memberId === member._id) {
                                            return (
                                                <li>

                                                    <div key={index} >
                                                        <a href="#" onClick={() => { dispatch({ type: 'SELECTED_MOVIE', payload: sub.movieId }); dispatch({ type: 'ROUTED', payload: true }); props.mainCB('Movies') }}>{sub.movieName}</a> | {sub.date}
                                                    </div>
                                                </li>
                                            )
                                        }
                                    })

                                }
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default AllSubscription;