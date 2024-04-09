import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import { useSelector } from "react-redux";

function Experiences() {
	const { portfolioData } = useSelector((state) => state.root);
	const { experiences } = portfolioData;
	const [selectedItemIndex, setSelectedItemIndex] = React.useState(0);
	return (
		<div>
			<SectionTitle Title='Experience' />
			<div className='flex py-10 gap-20 sm:flex-col'>
				<div className='flex flex-col gap-10  border-[#135e4c82] border-l-2 w-1/3 sm:flex-row sm:overflow-scroll sm:w-full'>
					{experiences.map((experience, index) => (
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
								{experience.period}
							</h1>
						</div>
					))}
				</div>

				<div className='flex flex-col gap-5'>
					<h1 className='text-secondary text-2xl'>
						{experiences[selectedItemIndex].title}
					</h1>
					<h1 className='text-tertiary text-1xl'>
						{experiences[selectedItemIndex].company}
					</h1>
					<p className='text-white'>
						{experiences[selectedItemIndex].description}
					</p>
				</div>
				<div></div>
			</div>
		</div>
	);
}

export default Experiences;
