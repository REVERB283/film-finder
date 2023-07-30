import React from "react";
import { useNavigate } from "react-router-dom";
import { type IMovie } from "../types/Movie";

interface IMovieListItemProps {
	movieItem: IMovie | null;
}

const MovieListItem = ({ movieItem }: IMovieListItemProps): React.ReactElement => {
	const navigate = useNavigate();

	const handleNavigate = (id?: string): void => {
		if (id !== "" && id !== undefined) navigate(id);
	};

	return (
		<div key={movieItem?.imdbID}>
			<img src={movieItem?.Poster} alt="" onClick={() => handleNavigate(movieItem?.imdbID)} />
		</div>
	);
};

export default MovieListItem;
