import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Modal, Form, Input, Button, message } from "antd";
import axios from "axios";
import { ShowLoading, HideLoading, ReloadData } from "../Redux/rootSlice"; // corrected import

function AdminProjects() {
	const dispatch = useDispatch();
	const { portfolioData } = useSelector((state) => state.root);
	const { projects } = portfolioData;
	const [showAddEditModal, setShowAddEditModal] = React.useState(false);
	const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);
	const [type, setype] = React.useState("add");

	const onFinish = async (values) => {
		try {
			const tempTechnologies = values?.technologies?.split(",");
			values.technologies = tempTechnologies;
			dispatch(ShowLoading());
			let response;
			if (selectedItemForEdit) {
				response = await axios.post("/api/update-project", {
					...values,
					_id: selectedItemForEdit._id,
				});
			} else {
				response = await axios.post("/api/add-project", values);
			}
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				setShowAddEditModal(false);
				setSelectedItemForEdit(null);
				dispatch(HideLoading());
				dispatch(ReloadData(true));
			} else {
				message.error(response.data.message);
			}
		} catch (error) {
			dispatch(HideLoading());
			message.error(error.message);
		}
	};

	const handleDelete = async (project) => {
		try {
			dispatch(ShowLoading());
			const response = await axios.post("/api/delete-project", {
				_id: project._id,
			});
			dispatch(HideLoading());
			if (response.data.success) {
				message.success(response.data.message);
				dispatch(HideLoading());
				dispatch(ReloadData(true));
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
			<div className='flex justify-end'>
				<button
					className='bg-primary px-5 py-2 text-white'
					onClick={() => {
						setSelectedItemForEdit(null);
						setShowAddEditModal(true);
					}}>
					Add project
				</button>
			</div>
			<div className='grid grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
				{projects.map((project, index) => (
					<div
						key={index}
						className='shadow border-2 p-5 border-gray-400 flex flex-col gap-5'>
						<h1 className='text-primary text-xl font-bold'>{project.title}</h1>
						<hr />
						<img src={project.image} alt='' className='h-60 w-80 rounded' />
						<h1>Description : {project.description}</h1>
						<div className='flex justify-end gap-5 mt-5'>
							<button
								className='bg-secondary text-white px-5 py-2 rounded'
								onClick={() => handleDelete(project)}>
								Delete
							</button>
							<button
								className='bg-primary text-white px-5 py-2 rounded'
								onClick={() => {
									setSelectedItemForEdit(project);
									setShowAddEditModal(true);
									setype("edit");
								}}>
								Edit
							</button>
						</div>
					</div>
				))}
			</div>

			{(type === "add" || selectedItemForEdit) && (
				<Modal
					visible={showAddEditModal} // corrected prop name
					title={selectedItemForEdit ? "Edit project" : "Add project"}
					footer={null}
					onCancel={() => {
						setShowAddEditModal(false);
						setSelectedItemForEdit(null);
					}}>
					<Form
						layout='vertical'
						onFinish={onFinish}
						initilalValues={
							{
								...selectedItemForEdit,
								technologies: selectedItemForEdit?.technologies?.join(","),
							} || {}
						}>
						<Form.Item name='title' label='Title'>
							<Input placeholder='Title' />
						</Form.Item>
						<Form.Item name='image' label='ImageUrl'>
							<Input placeholder='Image' />
						</Form.Item>

						<Form.Item name='description' label='Description'>
							<Input.TextArea placeholder='Project description' />
						</Form.Item>
						<Form.Item name='link' label='Link'>
							<Input placeholder='Link' />
						</Form.Item>
						<Form.Item name='technologies' label='Technologies'>
							<Input placeholder='Technologies' />
						</Form.Item>

						<div className='flex justify-end'>
							<Button
								className='border-primary text-primary px-5 py-2'
								onClick={() => {
									setShowAddEditModal(false);
									setSelectedItemForEdit(null);
								}}>
								Cancel
							</Button>
							<Button
								type='primary'
								htmlType='submit'
								className='bg-primary text-white px-5 py-2'>
								{selectedItemForEdit ? "Update" : "Add"}
							</Button>
						</div>
					</Form>
				</Modal>
			)}
		</div>
	);
}

export default AdminProjects;
