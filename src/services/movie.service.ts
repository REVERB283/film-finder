import apiService from "../apiService";
import { type IMovieDetail, type ISearchMovie } from "../types/Movie";

interface SearchMovieProps {
	s: string;
	page: number;
}

interface GetMovieDetailsProps {
	i: string;
}

export const searchMovie = async (params: SearchMovieProps): Promise<ISearchMovie> => {
	const response = await apiService<ISearchMovie>({ method: "GET", params })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
			return { Response: "False", Error: "Something went wrong", Search: [] };
		});

	return response;
};

export const getMovieDetails = async (params: GetMovieDetailsProps): Promise<IMovieDetail> => {
	const response = await apiService<IMovieDetail>({ method: "GET", params })
		.then((res) => res.data)
		.catch((err) => {
			console.log(err);
			return { Response: "False", Error: "Something went wrong" };
		});

	return response;
};
