import { useRouter } from 'next/router';
import { useState } from 'react';
import DashboardWrapper from '~/components/ui/DashboardWrapper';
import { Link } from '~/components/ui/Link';
import { DownloadIcon } from "@heroicons/react/outline"
import { TrashIcon, DocumentDuplicateIcon, PencilAltIcon, PlusIcon } from "@heroicons/react/solid"
import PATHS from '~/constants/paths';



interface Props {
	// ...video's metadata
	title: string,
	thumbnailUrl: string,
	hasFinishedRendering?: boolean
}

const thumbnailPhotoExamples = [
	"https://images.unsplash.com/photo-1611095965923-b8b19341cc29?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80",
	"https://images.unsplash.com/photo-1620681469593-906882d4e218?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
	"https://images.unsplash.com/photo-1620704087652-f4f843f04e6b?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5Nnx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1620755320418-2b2733dc7a9a?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTd8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1620591036360-12b9bd0dda94?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNTV8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1620709450523-786e53f0a073?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNjF8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
	"https://images.unsplash.com/photo-1485217988980-11786ced9454?ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxNjl8fHxlbnwwfHx8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"

]

const VideoElement = ({ title, thumbnailUrl, hasFinishedRendering }: Props) => {

	// Once the user clicks on the thumbnail the "finished rendering"'s style will disappear
	// This state controls this behavior
	const [finishedRenderingStyle, setFinishedRenderingStyle] = useState(hasFinishedRendering)


	const handleDelete = (id: number) => {
		// ...
	}
	const handleDuplicate = (id: number) => {
		// ...
	}
	const handleDownload = (id: number) => {
		// ...
	}
	const handleRename = (id: number) => {
		// ...
	}
	const handleEdit = (id: number) => {
		// ...
	}

	return <div onClick={() => setFinishedRenderingStyle(false)} className={`group relative shadow-md rounded-lg overflow-hidden ${finishedRenderingStyle && "ring-4 ring-blue-dashboard"}`}>
		<div className="w-full h-full aspect-w-10 aspect-h-8 relative">
			<img src={thumbnailUrl} alt={"thumbnail video " + title} className="object-cover transition-transform transform group-hover:scale-110" />
			{/* Colored overlay */}
			<div className={`absolute inset-0 bg-main opacity-50 transition-opacity group-hover:opacity-0`}>
			 {finishedRenderingStyle && <DownloadIcon className="absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 text-white" />}
			</div>
			{/* Black overlay on hover  */}
			<div className="absolute inset-0 filter bg-black opacity-0 transition-opacity group-hover:opacity-50"></div>
			{/* Buttons wrapper */}
			<div className="w-full h-full opacity-0 transition-opacity group-hover:opacity-100 text-white grid grid-rows-3">
				<div className="flex justify-center items-center">
					<button onClick={(_, id=1) => handleDownload(id)}><DownloadIcon className={`w-8 h-8 ${finishedRenderingStyle && "text-blue-dashboard transform scale-125"}`} /></button>
				</div>
				<div className="flex justify-center items-center">
					<button onClick={(_, id=1) => handleEdit(id)} className={`font-extrabold px-3 py-1 bg-white rounded-md text-font-1 ${ finishedRenderingStyle && "opacity-50" }`}>
						Edit
					</button>
				</div>
				<div className="grid grid-cols-3 w-full">
					<div className="flex justify-center items-center">
						<button className="font-extrabold text-xs" onClick={(_, id=1) => handleDelete(id)}>
							<img src="/assets/dashboard/delete-icon.svg" className={`w-6 h-6 transform scale-75 mx-auto ${ finishedRenderingStyle && "opacity-50" }`} />
							Delete
						</button>
					</div>
					<div className="flex justify-center items-center">
						<button className="font-extrabold text-xs" onClick={(_, id=1) => handleRename(id)}>
							<img src="/assets/dashboard/rename-icon.svg" className={`w-6 h-6 transform scale-125 mx-auto ${ finishedRenderingStyle && "opacity-50" }`} />
							Rename
						</button>
					</div>
					<div className="flex justify-center items-center">
						<button className="font-extrabold text-xs" onClick={(_, id=1) => handleDuplicate(id)}>
							<img src="/assets/dashboard/duplicate-icon.svg" className={`w-6 h-6 mx-auto ${ finishedRenderingStyle && "opacity-50" }`} />
								Duplicate
						</button>
					</div>
				</div>
			</div>

		</div>
		{ /* Video Title */ }
		<div className="group-hover:hidden absolute bottom-6 shadow-sm max-w-[75%] whitespace-nowrap h-6 bg-white uppercase text-xs text-font-1 pt-1 pb-2 px-5 rounded-tr-md rounded-br-md font-bold tracking-wider truncate">
			{ finishedRenderingStyle ? <span>rendering finished</span>  : title }
		</div>
	</div>
}

export default function MyProject() {
	const router = useRouter();

	return (
		<>
			<DashboardWrapper pageTitle="My Projects">
				
				<section className="pt-6 px-4 mb-24">
					<div className="mx-auto w-full sm:w-[300px]">
						<button onClick={() => router.push(PATHS.DASHBOARD.INDEX)} className="bg-gray-50 hover:bg-gray-100 text-font-2 hover:text-font-1 w-full h-[240px] focus:outline-none shadow-md focus:ring-4 focus:ring-blue-dashboard group rounded-lg overflow-hidden flex flex-col justify-center items-center uppercase">
							<PlusIcon className="h-8 w-8" />

							<div className="text-center">
								<div className="tracking-wider">new project</div>
							</div>
							
						</button>
					</div>

				</section>
				<ul role="list" className={
					"gap-y-8 gap-x-4 sm:gap-x-12 xl:gap-x-16 px-4 grid grid-cols-1  " +
					( thumbnailPhotoExamples.length > 3 ? "sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
						: thumbnailPhotoExamples.length === 3 ? "sm:grid-cols-2 lg:grid-cols-3"
						: thumbnailPhotoExamples.length === 2 ? "sm:grid-cols-2 max-w-3xl mx-auto" 
						: "grid-col-1 max-w-lg mx-auto" )
				}>
					{thumbnailPhotoExamples.map((thumbnailUrl, i) => i !== 2 ? <VideoElement key={thumbnailUrl} thumbnailUrl={thumbnailUrl} title={"ciao" + i} /> : <VideoElement key={i} thumbnailUrl={thumbnailUrl} title={"cdsahdsudsahidshuaidshiuadhiusaadsiuhiao" + i} hasFinishedRendering />)}
					
				</ul>

			</DashboardWrapper>
		</>
	);
}

