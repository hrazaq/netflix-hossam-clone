import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);

    //  A snippet of code which runs based on a specific condition/variable

    // every variable used inside of useEffect; should be putted in the bottom bracket !
    useEffect(() => {
        // if []; run once when the row loads, and dont run again !
        async function fetchData() {
            // wait for the response to come back
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    //console.table(movies);
    return ( 
        <div className = "row" >
            <h2> {title} </h2> 
            <div className = "row__posters" > 
            {movies.map((movie) => ( 
                <img 
                    className = {`row__poster ${isLargeRow && "row__posterLarge"}`}
                    key = {movie.id}
                    src = {base_url + 
                            (isLargeRow ? movie.poster_path // if isLargeRow use poster_path else...
                            : movie.backdrop_path)} // or ${base_url}${movie.poster_path }
                    alt = {movie.name}
                /> // alt means the alternative to show if it didn 't retreive the image src !
            ))} 
            </div> 
        </div>
    )
}

export default Row