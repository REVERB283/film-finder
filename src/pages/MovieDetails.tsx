import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movie.service";
import { type IMovie, type IMovieDetail } from "../types/Movie";
import { LIKED_MOVIES } from "../config";

const MovieDetails: React.FC = () => {
	const { movieId } = useParams();
	const [movieDetails, setMovieDetails] = useState<IMovieDetail | null>(null);

	useEffect(() => {
		fetchMovie();
	}, [movieId]);

	const fetchMovie = async (): Promise<void> => {
		const response = await getMovieDetails({ i: movieId ?? "" });
		if (response.Response === "True") setMovieDetails(response);
		else setMovieDetails(null);
	};

	const handleLikeButtonClick = (): void => {
		console.log(movieDetails);
		if (movieDetails !== null) {
			const moviesUnStringifyed = localStorage.getItem(LIKED_MOVIES);
			const movies: IMovie[] | null = moviesUnStringifyed !== null ? JSON.parse(moviesUnStringifyed) : [];

			const movieObj = {
				Poster: movieDetails.Poster ?? "",
				Title: movieDetails.Title ?? "",
				Type: movieDetails.Type ?? "",
				Year: movieDetails.Year ?? "",
				imdbID: movieDetails.imdbID ?? "",
			};

			if (movies !== null && movies.find((m) => m.imdbID === movieDetails.imdbID) === undefined) movies.push(movieObj);
			localStorage.setItem(LIKED_MOVIES, JSON.stringify(movies));
		}
	};

	return movieDetails !== null ? (
		<div style={{ display: "flex", justifyContent: "center", padding: "5rem" }}>
			<div>
				<img src={movieDetails?.Poster} alt={movieDetails?.Title} style={{ height: "70vh" }} />
			</div>
			<div style={{ padding: "0 3rem" }}>
				<h2>
					{movieDetails?.Title} ({movieDetails.Year})
				</h2>
				<p>{movieDetails?.Plot}</p>
				<p>{movieDetails?.Actors}</p>
				<p>Rating: {movieDetails?.imdbRating}</p>
				<button onClick={handleLikeButtonClick}>Like</button>
			</div>
		</div>
	) : null;
};

export default MovieDetails;
