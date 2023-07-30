import React from "react";
import { useNavigate } from "react-router-dom";
import { type IMovie } from "../types/Movie";
import { LIKED_MOVIES } from "../config";

interface IMovieListItemProps {
	movieItem: IMovie | null;
}

const MovieListItem = React.forwardRef<HTMLDivElement, IMovieListItemProps>(({ movieItem }, ref): JSX.Element => {
	const navigate = useNavigate();

	const handleNavigate = (id?: string): void => {
		if (id !== "" && id !== undefined) navigate(id);
	};

	const handleLikeButtonClick = (): void => {
		console.log(movieItem);
		const moviesUnStringifyed = localStorage.getItem(LIKED_MOVIES);
		const movies: IMovie[] | null = moviesUnStringifyed !== null ? JSON.parse(moviesUnStringifyed) : [];

		if (movies !== null && movieItem !== null && movies.find((m) => m.imdbID === movieItem.imdbID) === undefined) movies.push(movieItem);
		localStorage.setItem(LIKED_MOVIES, JSON.stringify(movies));
	};

	const renderMovieDetails = (): JSX.Element => {
		return (
			<>
				<img src={movieItem?.Poster} alt={movieItem?.Title} onClick={() => handleNavigate(movieItem?.imdbID)} />
				<button onClick={handleLikeButtonClick}>Like</button>
			</>
		);
	};

	return ref !== null ? (
		<div key={movieItem?.imdbID} ref={ref}>
			{renderMovieDetails()}
		</div>
	) : (
		<div key={movieItem?.imdbID}>{renderMovieDetails()}</div>
	);
});

MovieListItem.displayName = "MovieListItem";
export default MovieListItem;
