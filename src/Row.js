import React, { useState, useEffect } from 'react';
import axios from "./axios";
import "./Row.css";
import YouTube from 'react-youtube';
import movieTrailler from 'movie-trailer';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, settrailerUrl] = useState("");

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


    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
    };

    const handleClick =  (movie) => {
        if (trailerUrl) {
            settrailerUrl('');
        } else {
            movieTrailler(movie?.name || "")
            .then(url => {
                //console.log(url);
                // https://www.youtube.com/watch?v=gU2AMOMwstM
                const urlParams = new URLSearchParams(new URL(url).search); // to get everything after ? !
                settrailerUrl(urlParams.get("v"));
            }).catch((error) => console.log(error));
        }
    }

    return ( 
        <div className = "row" >
            <h2 className="row__title"> {title} </h2> 
            <div className = "row__posters" > 
                {movies.map((movie) => ( 
                    <img 
                        className = {`row__poster ${isLargeRow && "row__posterLarge"}`}
                        key = {movie.id}
                        onClick={() => handleClick(movie)}
                        src = {base_url + 
                                (isLargeRow ? movie.poster_path // if isLargeRow use poster_path else...
                                : movie.backdrop_path)} // or ${base_url}${movie.poster_path }
                        alt = {movie.name}
                    /> // alt means the alternative to show if it didn 't retreive the image src !
                ))} 
            </div>
           {trailerUrl &&
             <YouTube
                videoId={trailerUrl} 
                opts={opts}
             />
            }
        </div>
    )
}

export default Row