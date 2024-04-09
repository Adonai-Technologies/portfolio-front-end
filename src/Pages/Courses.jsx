import React from "react";
import SectionTitle from "../Components/SectionTitle";
import { useSelector } from "react-redux";


function Courses() {
	const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
	const { portfolioData } = useSelector((state) => state.root);
	const { course } = portfolioData;
	return (
		<div>
			<SectionTitle Title='Courses' />

			<div className='flex py-10 gap-20 sm:flex-col'>
				<div className='flex flex-col gap-10  border-[#135e4c82] border-l-2 w-1/3 sm:flex-row sm:overflow-scroll sm:w-full'>
					{course.map((course, index) => (
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
								{course.title}
							</h1>
						</div>
					))}
				</div>
				<div className='flex items-center justify-center gap-10 sm:flex-col'>
					<div className='flex flex-col gap-5'>
						<h1 className='text-secondary text-2xl'>
							{course[selectedItemIndex].title}
						</h1>
						<p className='text-white'>
							{course[selectedItemIndex].description}
						</p>
						
					</div>
					<img
						src={course[selectedItemIndex].image}
						alt=''
						className='h-52 w-80'
					/>
				</div>
				<div></div>
			</div>
		</div>
	);
}

export default Courses;
