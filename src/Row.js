import React, { useState, useEffect } from 'react'
import './Row.scss'
import axios from './axios'
import { v4 as uuidv4 } from 'uuid';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([])
    
    const base_url = "https://image.tmdb.org/t/p/original"

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl)
            setMovies(request.data.results)
            return request;
        }

        fetchData();
    }, [fetchUrl])

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row__posters">
                {movies.map(movie => (
                    ((isLargeRow && movie.poster_path) || 
                    (!isLargeRow && movie.backdrop_path)) && (
                        <img
                            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                            key={uuidv4()}
                            src={`${base_url}${
                                isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`}
                            alt={movie?.original_name || movie?.name || movie?.title}
                        />
                    )
                ))}
            </div>            
        </div>
    )
}

export default Row
