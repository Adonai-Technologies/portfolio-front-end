import React from "react";
import { Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { ShowLoading, HideLoading } from "../Redux/rootSlice";
import axios from "axios";
import { message } from "antd";

function AdminContact() {
	const dispatch = useDispatch();
	const { portfolioData } = useSelector((state) => state.root);
	const onFinish = async (values) => {
		try {
			dispatch(ShowLoading());
			const response = await axios.post("/api/update-contact", {
				...values,
				_id: portfolioData.contact._id,
			});
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};
	return (
		<div>
			<Form
				onFinish={onFinish}
				layout='vertical'
				initialValues={portfolioData.contact}>
				<Form.Item name='name' label='Name'>
					<input placeholder='Akua' />
				</Form.Item>

				<Form.Item name='age' label='Age'>
					<input placeholder='age' />
				</Form.Item>
				<Form.Item name='gender' label='Gender'>
					<input placeholder='gender' />
				</Form.Item>
				<Form.Item
					name='mobile' label='Mobile'>
					<input type="number" placeholder='mobile' />
				</Form.Item>
				<Form.Item name='email' label='Email'>
					<input type="email" placeholder='example@gmail.com' />
				</Form.Item>
				<Form.Item name='country' label='Country'>
					<input type="text" placeholder='Ghana' />
				</Form.Item>
				<div className='flex justify-end w-full'>
					<button className='px-10 py-2 bg-primary text-white' type='submit'>
						Save
					</button>
				</div>
			</Form>
		</div>
	);
}

export default AdminContact;
