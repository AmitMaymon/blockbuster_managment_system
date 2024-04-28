import axios from 'axios';
import React, { useState } from 'react';

function AddMovie(props) {
    const URL = 'http://127.0.0.1:5000/movies/'
    const [movie, setMovie] = useState({
        name: '',
        image: '',
        premiered: '',
        genres: []
    })




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
        console.log('save')

        const {data} = await axios.post(URL,movie,{headers:{'Authorization':`Bearer ${document.cookie.split('=')[1]}`}})

        console.log(data);
        props.cb('All Movies')
    }

    const handleCancel = () => {
        props.cb('All Movies')
    }

    return (
        <div>
            <br /><br />

            Name: <input name='name' type="text" onChange={handleChange} />  <br />
            Genres: <input name='genres' type="text" placeholder='action,comedy,...' onChange={handleChange} /> <br />
            Image URL: <input name='image' type="text" onChange={handleChange} /> <br />
            Premiered: <input name='premiered' type="text" placeholder='YYYY-MM-DD' onChange={handleChange} /> <br /><br />

            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>

        </div>
    );
}

export default AddMovie;