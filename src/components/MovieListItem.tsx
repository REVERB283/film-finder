import React from "react";
import { useNavigate } from "react-router-dom";
import { type IMovie } from "../types/Movie";
import styled from "@emotion/styled";

interface IMovieListItemProps {
	movieItem: IMovie | null;
}

const MovieListItem = React.forwardRef<HTMLDivElement, IMovieListItemProps>(({ movieItem }, ref): JSX.Element => {
	const navigate = useNavigate();

	const MoviePosterContainer = styled.div`
		width: 85%;
		height: auto;
		overflow: hidden;
		margin: 0 auto;
		:hover img {
			transform: scale(1.2);
		}
	`;

	const MoviePosterImage = styled.img`
		cursor: pointer;
		width: 100%;
		transition: 0.2s all ease-in-out;
	`;

	const handleNavigate = (id?: string): void => {
		if (id !== "" && id !== undefined) navigate(`/movies/${id}`);
	};

	const renderMovieDetails = (): JSX.Element => {
		return (
			<>
				<MoviePosterContainer>
					<MoviePosterImage src={movieItem?.Poster} alt={movieItem?.Title} onClick={() => handleNavigate(movieItem?.imdbID)} />
				</MoviePosterContainer>
				<h5 className="my-2 text-center">
					{movieItem?.Title} ({movieItem?.Year})
				</h5>
				<h6 className="text-capitalize">{movieItem?.Type}</h6>
			</>
		);
	};

	return ref !== null ? (
		<div className="col-sm-12 col-md-6 my-3 d-flex flex-column align-items-center justify-content-center" key={movieItem?.imdbID} ref={ref}>
			{renderMovieDetails()}
		</div>
	) : (
		<div className="col-sm-12 col-md-6 my-3 d-flex flex-column align-items-center justify-content-center" key={movieItem?.imdbID}>
			{renderMovieDetails()}
		</div>
	);
});

MovieListItem.displayName = "MovieListItem";
export default MovieListItem;
