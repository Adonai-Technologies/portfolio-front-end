import React from "react";
import { ShowLoading, HideLoading } from "../Redux/rootSlice";
import message from "antd/lib/message";
import axios from "axios";
import { useDispatch } from "react-redux";
function AdminLogin() {
	const [user, setUser] = React.useState({
		username: "",
		password: "",
	});
	const dispatch = useDispatch();
	const login = async () => {
		try {
			dispatch(ShowLoading());
			const response = await axios.post("/api/admin-login", user);
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				localStorage.setItem("token", JSON.stringify(response.data.data));
				window.location.href = "/admin";
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			message.error(error.message);
			dispatch(HideLoading());
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-primary'>
			<div className='w-96 flex gap-5 p-5 border border-gray-400 flex-col bg-white'>
				<h1 className='text-2xl'> Portfolio-Admin Login</h1>
				<input
					type='text'
					placeholder='username'
					onChange={(e) => setUser({ ...user, username: e.target.value })}
				/>
				<input
					type='password'
					placeholder='password'
					onChange={(e) => setUser({ ...user, password: e.target.value })}
				/>

				<button
					onClick={login}
					className='bg-primary text-white p-2 rounded-lg'>
					Login
				</button>
			</div>
		</div>
	);
}

export default AdminLogin;
