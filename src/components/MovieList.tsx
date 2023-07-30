import React, { useEffect, useState } from "react";
import { type IMovie } from "../types/Movie";
import MovieListItem from "./MovieListItem";
import { searchMovie } from "../services/movie.service";

const MoviesList: React.FC = () => {
	const [searchKeyword, setSearchKeyword] = useState<string>("");
	const [page, setPage] = useState<number>(1);
	const [movieList, setMovieList] = useState<IMovie[] | null>(null);

	useEffect(() => {
		fetchMovies();
	}, [searchKeyword, page]);

	const fetchMovies = async (): Promise<void> => {
		const response = await searchMovie({ s: searchKeyword, page });
		if (response.Response === "True") setMovieList(response.Search ?? []);
		else setMovieList(null);
	};

	const handleInputChange = (target: HTMLInputElement): void => {
		const targetValue = target.value;
		setMovieList([]);
		setSearchKeyword(targetValue);
	};

	const goToPagePrevious = (): void => {
		setPage((page) => Math.max(page - 1, 1));
	};

	const goToPageNext = (): void => {
		setPage(page + 1);
	};

	return (
		<div>
			<input type="text" name="" id="" value={searchKeyword} onChange={(e) => handleInputChange(e.target)} />

			{movieList !== null ? movieList.map((m) => <MovieListItem key={m.imdbID} movieItem={m} />) : null}

			<div>
				<button onClick={goToPagePrevious}>{"<"}</button>
				{page}
				<button onClick={goToPageNext}>{">"}</button>
			</div>
		</div>
	);
};

export default MoviesList;
