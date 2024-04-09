import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import { useEffect,useCallback  } from "react";
import Loader from "./Components/Loader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
	HideLoading,
	SetPortfolioData,
	ShowLoading,
	ReloadData,
} from "./Redux/rootSlice";
import Admin from "./Admin";
import AdminLogin from "./Admin/AdminLogin";


function App() {
	const { loading, portfolioData, reloadData } = useSelector(
		(state) => state.root
	);
	const dispatch = useDispatch();
	const getPortfolioData = useCallback(async () => {
		try {
			dispatch(ShowLoading());
			const response = await axios.get("/api/get-portfolio-data");
			dispatch(SetPortfolioData(response.data));
			dispatch(ReloadData(false));
			dispatch(HideLoading());
		} catch (error) {
			dispatch(HideLoading());
		}
	}, [dispatch]);

	useEffect(() => {
		if (reloadData) {
			getPortfolioData();
		}
	}, [reloadData, getPortfolioData]);

	useEffect(() => {
		if (!portfolioData) {
			getPortfolioData();
		}
	}, [portfolioData, getPortfolioData]);

	return (
		<BrowserRouter>
			{loading ? <Loader /> : null}
			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/admin' element={<Admin />} />
				<Route path='/admin-login' element={<AdminLogin />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
