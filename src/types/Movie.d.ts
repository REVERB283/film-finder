export interface IMovie {
	Poster: string;
	Title: string;
	Type: string;
	Year: string;
	imdbID: string;
}

export interface ISearchMovie {
	Response: string;
	Search: IMovie[];
	totalResults?: string;
	Error?: string;
}

export interface IMovieDetail {
	Response: string;
	Error?: string;
	Title?: string;
	Year?: string;
	Rated?: string;
	Released?: string;
	Runtime?: string;
	Genre?: string;
	Director?: string;
	Writer?: string;
	Actors?: string;
	Plot?: string;
	Language?: string;
	Country?: string;
	imdbRating?: string;
	Poster?: string;
	Type?: string;
}
