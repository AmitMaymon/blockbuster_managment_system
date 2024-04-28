import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

function EditMovie(props) {
    const [movie,setMovie] = useState(props.movie)
    const selectedMovie = useSelector(state => state.selected_movie)
    const URL = 'http://127.0.0.1:5000/movies/'

    useEffect(() => {
        console.log(movie)
    }, [])



    const handleChange = (e) => {
        if(e.target.name === 'genres'){
            setMovie({
                ...movie,
                genres: e.target.value.split(',')
            })
            return
        }

        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSave = async () => {
        const {data} = await axios.put(`${URL}${movie._id}`,movie,{headers : {'Authorization':`Bearer ${document.cookie.split('=')[1]}`}})

        console.log(data);
        props.cb('All Movies')
    }

    const handleCancel = () => {
        props.cb('All Movies')
    }

    return (
        <div>
            <br /><br />

            Name: <input name='name' type="text" onChange={handleChange} value={movie.name} />  <br />
            Genres: <input name='genres' type="text" placeholder='action,comedy,...' onChange={handleChange} value={movie.genres}/> <br />
            Image URL: <input name='image' type="text" onChange={handleChange} value={movie.image} /> <br />
            Premiered: <input name='premiered' type="text" placeholder='DD/MM/YYYY' onChange={handleChange} value={movie.premiered} /> <br /><br />

            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>

        </div>
    );
}

export default EditMovie;