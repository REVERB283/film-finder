import React, { useEffect, useState } from "react";
import { type IMovie } from "../types/Movie";
import { LIKED_MOVIES } from "../config";
import MovieListItem from "../components/MovieListItem";

function Favourites(): React.ReactElement {
	const [likedMovies, setLikedMovies] = useState<IMovie[] | null>(null);

	useEffect(() => {
		const moviesUnStringifyed = localStorage.getItem(LIKED_MOVIES);
		const movies = moviesUnStringifyed !== null ? JSON.parse(moviesUnStringifyed) : [];
		setLikedMovies(movies);
	}, []);

	return (
		<div className="p-3 p-md-5">
			<div className="row mx-0 px-sm-4">{likedMovies?.map((m) => <MovieListItem key={m.imdbID} movieItem={m} />)}</div>
		</div>
	);
}

export default Favourites;
