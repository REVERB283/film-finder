import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "../services/movie.service";
import { type IMovieDetail } from "../types/Movie";

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

	return movieDetails !== null ? (
		<div>
			<h4>{movieDetails?.Title}</h4>
			<img src={movieDetails?.Poster} alt={movieDetails?.Title} />
			<p>{movieDetails?.Plot}</p>
			<p>{movieDetails?.Actors}</p>
			<p>{movieDetails?.imdbRating}</p>
		</div>
	) : null;
};

export default MovieDetails;
