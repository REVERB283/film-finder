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
		if (id !== "" && id !== undefined) navigate(`/movies/${id}`);
	};

	const renderMovieDetails = (): JSX.Element => {
		return (
			<>
				<img src={movieItem?.Poster} alt={movieItem?.Title} onClick={() => handleNavigate(movieItem?.imdbID)} />
				<p>
					{movieItem?.Title} ({movieItem?.Year})
				</p>
				<p>{movieItem?.Type}</p>
			</>
		);
	};

	return ref !== null ? (
		<div key={movieItem?.imdbID} ref={ref} style={{ border: "1px solid black" }}>
			{renderMovieDetails()}
		</div>
	) : (
		<div
			key={movieItem?.imdbID}
			style={{ border: "1px solid black", boxSizing: "border-box", cursor: "pointer", width: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}
		>
			{renderMovieDetails()}
		</div>
	);
});

MovieListItem.displayName = "MovieListItem";
export default MovieListItem;
