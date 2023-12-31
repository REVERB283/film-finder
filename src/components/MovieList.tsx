import React, { useCallback, useEffect, useRef, useState } from "react";
import { searchMovie } from "../services/movie.service";
import { type IMovie } from "../types/Movie";
import MovieListItem from "./MovieListItem";

const MoviesList: React.FC = React.memo(() => {
	const intersectionObeserver = useRef<IntersectionObserver>();

	const [searchKeyword, setSearchKeyword] = useState<string>("dog");
	const [page, setPage] = useState<number>(1);
	const [movieList, setMovieList] = useState<IMovie[] | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	useEffect(() => {
		const fetchMovies = async (): Promise<void> => {
			setIsLoading(true);
			const response = await searchMovie({ s: searchKeyword, page });
			if (response.Response === "True") setMovieList((list) => (list !== null ? list.concat(response.Search) : response.Search));
			else {
				setMovieList(null);
				setPage(1);
			}
			setIsLoading(false);
		};
		fetchMovies();
	}, [searchKeyword, page]);

	const lastMovieElementRef = useCallback(
		(movie: HTMLDivElement) => {
			if (isLoading) return;

			if (intersectionObeserver.current !== null && intersectionObeserver.current !== undefined) intersectionObeserver.current.disconnect();

			intersectionObeserver.current = new IntersectionObserver((movies) => {
				if (movies[0].isIntersecting) {
					setPage((page) => page + 1);
				}
			});

			if (movie !== null) intersectionObeserver.current.observe(movie);
		},
		[isLoading],
	);

	const handleInputChange = (target: HTMLInputElement): void => {
		const targetValue = target.value;
		setMovieList([]);
		setSearchKeyword(targetValue);
	};

	return (
		<div className="p-3 p-md-5">
			<div className="row my-5 mx-0">
				<input className="form-control" type="text" name="search" value={searchKeyword} onChange={(e) => handleInputChange(e.target)} placeholder="Search for Movie" />
			</div>

			{isLoading ? <h3 className="d-flex justify-content-center align-items-center fw-bold vh-100">Loading...</h3> : null}

			<div className="row mx-0 px-sm-4">
				{movieList !== null ? (
					movieList.map((m, i) => {
						if (i === movieList.length - 1) return <MovieListItem key={m.imdbID} movieItem={m} ref={lastMovieElementRef} />;
						return <MovieListItem key={m.imdbID} movieItem={m} />;
					})
				) : (
					<h3 className="d-flex justify-content-center align-items-center fw-bold vh-100">Something went wrong.</h3>
				)}
			</div>
		</div>
	);
});

MoviesList.displayName = "MoviesList";
export default MoviesList;
