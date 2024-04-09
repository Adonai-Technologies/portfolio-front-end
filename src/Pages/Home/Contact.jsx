import React from "react";
import SectionTitle from "../../Components/SectionTitle";
import { useSelector } from "react-redux";

function Contact() {
	const { portfolioData } = useSelector((state) => state.root);
	const { contact } = portfolioData;

	return (
		<div>
			<SectionTitle Title='Get In Touch' />

			<div className='flex sm:flex-col items-center justify-between'>
				<div className='flex flex-col gap-1'>
					<p className='text-tertiary'>{"{"}</p>
					{Object.keys(contact).map(
						(key) =>
							key !== "_id" && (
								<p className='ml-5 '>
									<span className='text-tertiary'>{key} : </span>
									<span className='text-tertiary'>{contact[key]}</span>
								</p>
							)
					)}
					<p className='text-tertiary'>{"}"}</p>
				</div>
				<div className='h-[400px]'>
					<lottie-player
						src='https://lottie.host/dad08230-2077-4a7b-bdb0-dcd10704452f/exKDsM2SLT.json'
						background='##FFFFFF'
						autoplay></lottie-player>
				</div>
			</div>
		</div>
	);
}

export default Contact;
