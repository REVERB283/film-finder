import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LIKED_MOVIES } from "../config";
import { getMovieDetails } from "../services/movie.service";
import { type IMovie, type IMovieDetail } from "../types/Movie";
import styled from "@emotion/styled";

const MovieDetails: React.FC = () => {
	const { movieId } = useParams();
	const [movieDetails, setMovieDetails] = useState<IMovieDetail | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	const CoverImage = styled.img`
		object-fit: fill;
		width: 100%;
	`;

	useEffect(() => {
		const fetchMovie = async (): Promise<void> => {
			setIsLoading(true);
			const response = await getMovieDetails({ i: movieId ?? "" });
			if (response.Response === "True") setMovieDetails(response);
			else setMovieDetails(null);
			setIsLoading(false);
		};
		fetchMovie();
	}, [movieId]);

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

	return (
		<>
			{isLoading ? <h3 className="d-flex justify-content-center align-items-center fw-bold vh-100">Loading...</h3> : null}
			{!isLoading &&
				(movieDetails !== null ? (
					<div className="row my-5 mx-0 px-3 px-md-5">
						<div className="col-sm-12 col-md-6 px-5">
							<CoverImage src={movieDetails?.Poster} alt={movieDetails?.Title} style={{}} />
						</div>
						<div className="col-sm-12 col-md-6 px-5 my-3 my-md-0">
							<h2 className="fw-bold">
								{movieDetails?.Title} ({movieDetails.Year})
							</h2>
							<p>{movieDetails?.Plot}</p>
							<p>{movieDetails?.Actors}</p>
							<p>Rating: {movieDetails?.imdbRating}</p>
							<button className="btn btn-primary px-5" onClick={handleLikeButtonClick}>
								Like
							</button>
						</div>
					</div>
				) : (
					<h3 className="d-flex justify-content-center align-items-center fw-bold vh-100">Something went wrong.</h3>
				))}
		</>
	);
};

export default MovieDetails;
