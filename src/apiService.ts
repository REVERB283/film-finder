import axios from "axios";
import { API_KEY } from "./config";

export default axios.create({
	baseURL: "https://www.omdbapi.com/",
	headers: { "Content-Type": "application/json" },
	params: {
		apikey: API_KEY,
	},
});
