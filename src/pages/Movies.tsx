import React from "react";
import MoviesList from "../components/MovieList";

const Movies: React.FC = React.memo(() => {
	return (
		<div className="container">
			<MoviesList />
		</div>
	);
});

Movies.displayName = "Movies";

export default Movies;
