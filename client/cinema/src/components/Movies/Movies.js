import React, { useEffect, useState } from 'react';
import AllMovies from './AllMovies';
import EditMovie from './EditMovie';
import AddMovie from './AddMovie';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function Movies(props) {
    const [selectedButton, setSelectedButton] = useState('All Movies');
    const [selectedMovie, setSelectedMovie] = useState({});
    const [searchTerm, setSearchTerm] = useState('')
    const dispatch = useDispatch()
    const routedSelectedMovie = useSelector(state => state.selected_movie)

    const addMoviePermission = useSelector(state => state.create_movie)
    const hasAccess = useSelector(state => state.view_movies)
    const routed = useSelector(state => state.routed)


    const NoAccess = () => {
        return (
            <div>
                <h1>Access denied</h1>
            </div>
        );
    }
    const cb = (text, movie) => {
        setSelectedButton(text)
        setSelectedMovie(movie)
    }

    useEffect(() => {
        if (!hasAccess) {
            setSelectedButton('No Access')
        }

        const routeMovie = async () => {
            dispatch({ type: 'ROUTED', payload: false })
            const token = document.cookie.split('=')[1]
            console.log(routedSelectedMovie);
            const { data } = await axios.get(`http://127.0.0.1:5000/movies/${routedSelectedMovie}`, { headers: { 'Authorization': `Bearer ${token}` } })
            cb('Edit Movie', data[0])
        }

        if(routed){
            routeMovie()
        }

    }, [])

    return (
        <div>
            <h1>Movies</h1><br />
            {
                hasAccess ?
                <button
                    style={selectedButton === 'All Movies' ? { backgroundColor: 'yellow' } : {}}
                    onClick={() => setSelectedButton('All Movies')}
                >All Movies</button>:
                NoAccess()

            }
            &nbsp;
            {
                addMoviePermission &&

                <button
                    style={selectedButton === 'Add Movie' ? { backgroundColor: 'yellow' } : {}}
                    onClick={() => setSelectedButton('Add Movie')}
                >Add Movie</button>
            }
            &nbsp;

            <button
                style={selectedButton === 'Edit Movie' ? { backgroundColor: 'yellow', display: 'inline' } : { display: 'none' }}
                onClick={() => setSelectedButton('Edit Movie')}
            >
                Edit Movie
            </button>


            &nbsp;
            {
                selectedButton === 'All Movies' &&
                <span>Find Movie:<input type='text' value={searchTerm} onChange={e => setSearchTerm(e.target.value)} /></span>
            }




            {selectedButton === 'All Movies' && <AllMovies cb={cb} mainCB={props.mainCB} searchTerm={searchTerm} />}
            {selectedButton === 'Add Movie' && <AddMovie cb={cb} />}
            {selectedButton === 'No Access' && <NoAccess />}
            {selectedButton === 'Edit Movie' && <EditMovie cb={cb} movie={selectedMovie} />}
        </div>
    );
}

export default Movies;