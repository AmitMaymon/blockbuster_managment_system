import axios from 'axios';
import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useDispatch, useSelector } from 'react-redux';

function AllMovies(props) {
    const URL = 'http://127.0.0.1:5000/movies/'
    const subsURL = 'http://127.0.0.1:5000/subs/'
    const updateMovie = useSelector(state => state.update_movie)
    const deleteMovie = useSelector(state => state.delete_movie)
    const subsAccess = useSelector(state => state.view_subscription)

    const [subs, setSubs] = useState([])
    const [movies, setMovies] = useState([])
    const [allMovies, setAllMovies] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const dispatch = useDispatch()

    const pageSize = 10




    const fetchAllMovies = async () => {
        const token = document.cookie.split('=')[1]
        const { data } = await axios.get(URL, { headers: { 'Authorization': `Bearer ${token}` } })
        if (data.status === 'error') {
            props.cb()
            return
        }
        if (data) {
            setMovies(data)
            setAllMovies(data)
        }
    }

    const fetchSubscriptions = async () => {

        const token = document.cookie.split('=')[1]
        const { data } = await axios.get(subsURL, { headers: { 'Authorization': `Bearer ${token}` } })
        setSubs(data)
    }


    useEffect(() => {
        fetchSubscriptions()
    }, [])

    useEffect(() => {
        if (props.searchTerm) {
            const filteredMovies = allMovies.filter(movie =>
                movie.name.toLowerCase().includes(props.searchTerm.toLowerCase())
            )
            setMovies(filteredMovies)

        } else {
            setMovies(allMovies)
        }

    }, [props.searchTerm])


    useEffect(() => {
        fetchAllMovies()

    }, []);


    const handleUpdate = (movie) => {
        props.cb('Edit Movie', movie)
    }

    const handleDelete = async (movie) => {
        const token = document.cookie.split('=')[1]
        const { data } = await axios.delete(`${URL}${movie._id}`, { headers: { 'Authorization': `Bearer ${token}` } })
        for (let i = 0; i < movies.length; i++) {
            if (movies[i]._id === movie._id) {
                movies.splice(i, 1)
                setMovies([...movies])
                break
            }
        }
    }








    return (


        <div>
            <InfiniteScroll
                dataLength={currentPage * pageSize} //This is important field to render the next data
                next={() => setCurrentPage(currentPage + 1)}
                hasMore={currentPage * pageSize < movies.length}
                loader={<h4>Loading...</h4>}
                endMessage={
                    <p style={{ textAlign: 'center' }}>
                        <b>No More Data</b>
                    </p>
                }

            >




                <div className="movies-container" >

                    {
                        movies?.slice(0, currentPage * pageSize).map((movie, index) => {
                            return (
                                <div style={{ border: 'black 1px solid', maxWidth: '50%' }} key={index}>
                                    <b>Name:</b> {movie.name} <br />
                                    <b>Genres:</b> {movie.genres?.map((genre, index) => {
                                        return (
                                            <span key={index}>{genre}, </span>
                                        )
                                    })} <br />
                                    <img style={{ height: '100px' }} src={movie.image} alt={movie.name} />
                                    <b>Subscriptions:</b>
                                    <ul>
                                        {
                                            subsAccess &&
                                            subs.map((sub, index) => {
                                                if (sub.movieId === movie._id) {
                                                    return (
                                                        <li key={index}><a href="#" onClick={()=>{dispatch({ type: 'SELECTED_MEMBER', payload: sub.memberId });dispatch({type:'ROUTED',payload:true}) ;props.mainCB('Subscriptions')}}>{sub.memberName}</a>,{sub.date}</li>
                                                    )
                                                }
                                            })
                                        }
                                    </ul>
                                    <br />
                                    <b>Premiered:</b> {movie.premiered} <br />
                                    <br />
                                    {
                                        updateMovie &&
                                        <button onClick={() => { handleUpdate(movie) }}>Edit</button>
                                    }
                                    {
                                        deleteMovie &&
                                        <button onClick={() => { handleDelete(movie) }}>Delete</button>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default AllMovies;