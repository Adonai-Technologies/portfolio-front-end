import React from "react";
import SectionTitle from "../Components/SectionTitle";

import { useSelector } from "react-redux";

function Projects() {
	const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
	const { portfolioData } = useSelector((state) => state.root);
	const { projects } = portfolioData;
	return (
		<div>
			<SectionTitle Title='Projects' />

			<div className='flex py-10 gap-20 sm:flex-col'>
				<div className='flex flex-col gap-10  border-[#135e4c82] border-l-2 w-1/3 sm:flex-row sm:overflow-scroll sm:w-full'>
					{projects.map((project, index) => (
						<div
							onClick={() => {
								setSelectedItemIndex(index);
							}}
							className='cursor-pointer'>
							<h1
								className={`text-xl px-5
                                  ${
																		selectedItemIndex === index
																			? "text-tertiary border-tertiary border-l-4 -ml-[2px] bg-[#15503bef] py-3"
																			: "text-white"
																	}`}>
								{project.title}
							</h1>
						</div>
					))}
				</div>
				<div className='flex items-center justify-center gap-10 sm:flex-col'>
					<img
						src={projects[selectedItemIndex].image}
						alt=''
						className='h-60 w-72'
					/>
					<div className='flex flex-col gap-5'>
						<h1 className='text-secondary text-2xl'>
							{ projects[selectedItemIndex].title}
						</h1>
						<p className='text-white'>
							{ projects[selectedItemIndex].description}
						</p>
						<p className='text-white'>
							Lorem ipsum dolor, sit amet consectetur adipisicing elit.
							Explicabo ratione enim possimus quaerat hic saepe debitis ducimus
							porro, repudiandae vel perferendis ab tempore veniam rem facere
							laboriosam, accusantium aperiam numquam!
						</p>
					</div>
				</div>
				<div></div>
			</div>
		</div>
	);
}

export default Projects;
