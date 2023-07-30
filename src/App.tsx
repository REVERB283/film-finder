import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Favourites from "./pages/Favourites";
import MainPage from "./pages/MainPage";
import MovieDetails from "./pages/MovieDetails";
import Movies from "./pages/Movies";
import PageNotFound from "./pages/PageNotFound";

function App(): React.ReactElement {
	return (
		<Routes>
			<Route path="/" element={<MainPage />}>
				<Route path="/movies" element={<Movies />} />
				<Route path="/movies/:movieId" element={<MovieDetails />} />
				<Route path="liked" element={<Favourites />} />
			</Route>
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
