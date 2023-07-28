import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Favourites from "./components/Favourites";
import Movie from "./components/Movie";
import Movies from "./components/Movies";
import PageNotFound from "./components/PageNotFound";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Navigate to="/movies" />} />
			<Route path="/movies" element={<Movies />}>
				<Route path=":movieId" element={<Movie />} />
			</Route>
			<Route path="/liked" element={<Favourites />} />
			<Route path="*" element={<PageNotFound />} />
		</Routes>
	);
}

export default App;
