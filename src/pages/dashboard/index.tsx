import { CloudUploadIcon, InformationCircleIcon } from '@heroicons/react/outline';
import { ChevronLeftIcon, XIcon } from '@heroicons/react/outline';
import { redirect } from 'next/dist/next-server/server/api-utils';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import DashboardWrapper from '~/components/ui/DashboardWrapper';
import DestructiveActionModal from '~/components/ui/DestructiveActionModal';
import Select from '~/components/ui/Form/Select';
import { Link } from '~/components/ui/Link';
import ProgressBar from '~/components/ui/ProgressBar';
import PATHS from '~/constants/paths';


interface StepProps {
	setUserVideoOptions: Dispatch<SetStateAction<{ language: string, keywords: string }>>,
	setIndexStep: Dispatch<SetStateAction<number>>
}

/*
	LANGUAGE SELECTION STEP
*/
function SelectLanguageStep({ setUserVideoOptions, setIndexStep } : StepProps) {
	const selectItems = ["English US","English UK", "English Australia", "German"].map(x => ({ label: x, value: x }))

	const handleChange = (language: string) => {
		setUserVideoOptions(prev => ({ ...prev, language }))
		setIndexStep((prev: number) => prev + 1)
	}

	return <div className="pb-8">						
		<label className="text-font-1 block text-center text-xl uppercase font-bold">choose the language</label>
		<Select className="max-w-md mx-auto shadow-lg rounded-md" items={selectItems} initialValue={"1"} onChange={(lang) => lang && handleChange(lang)}  />
	</div>
}

/*
	KEYWORD SELECTION STEP
*/
function KeywordsStep({ setUserVideoOptions, setIndexStep }: StepProps) {

	const [keywords, setKeywords] = useState("")

	const handleContinue = () => {
		setUserVideoOptions(prev => ({ ...prev, keywords  }))
		setIndexStep(prev => prev + 1)
	}

	return <div>
		<div className="sm:grid sm:grid-cols-9 gap-4">
			<div className="col-span-4">
				<h2 className="uppercase font-bold text-lg text-font-1 tracking-wider">optional: spot keywords</h2>
				<div className="text-font-icon flex gap-2 mt-2">
					<InformationCircleIcon className="w-8 h-8 flex-grow-0 flex-shrink-0" />
					<div className="text-xs text-font-2">
						Spot Keywords can save you time when editing the subtitles.
						<br/>
						Technical terms of difficult names, which most likely will be misinterpreted by the AI, can be written down here.
						<br/><br/>
						A comma between each keyword is necessary.
					</div>
				</div>
			</div>
			<div className="col-span-5 mt-6 sm:mt-0">
				<textarea value={keywords} onChange={(e) => setKeywords(e.target.value)} className="w-full h-64 border-1 focus:outline-none focus:ring-1 border-font-icon resize-none shadow-md rounded-xl" placeholder="Example, Example2, ..." />
			</div>
			
		</div>
		<button 
				type="button" 
				onClick={handleContinue}
				className="mt-12 w-full block py-3 text-lg font-bold uppercase text-white bg-[#425B7D] rounded-lg hover:opacity-80"
			>
			Continue
		</button>
	</div>
}

/* FINAL STEP  */
interface FinalMessageStepProps {
	progress: number;
}

function FinalMessageStep({ progress } : FinalMessageStepProps) {

	const router = useRouter()

	useEffect(() => {
		// When the progress is 100 the user will be redirected in the my projects page
		if (progress >= 100) {
			setTimeout(() => router.push(PATHS.DASHBOARD.MY_PROJECTS), 2000)
		}
	}, [progress])

	return <div className="pb-4">
		<h3 className="text-xl text-font-1">{ progress < 100 ? "Wait until the upload is finished..." : "Upload Completed. Redirecting..."}</h3>
		{	progress < 100 && <p className="text-font-2">You'll be redirected in the project page after it finishes.</p>}
	</div>
}


/* UPLOAD PROGRESS MODAL */
interface DashboardModalProps {
	setShowModal: Dispatch<SetStateAction<boolean>>
}

function DashboardModal({ setShowModal } : DashboardModalProps) {

	const [progress, setProgress] = useState<number>(1)
	const [openCancelModal, setOpenCancelModal] = useState<boolean>(false)
	const intervalRef= useRef<NodeJS.Timeout | null>(null)

	// I coded the step process like this so it would be easier to add more steps if needed. Just add the step component in the array of steps,
	// Pass the setIndexStep and setUserVideoOptions to the component to get the data and to control the step process.
	const [indexStep, setIndexStep] = useState<number>(0)
	const [userVideoOptions, setUserVideoOptions] = useState({
		language: "",
		keywords: ""
	})
	const steps: Array<JSX.Element> = [
		<SelectLanguageStep setIndexStep={setIndexStep} setUserVideoOptions={setUserVideoOptions} />,
		<KeywordsStep setIndexStep={setIndexStep} setUserVideoOptions={setUserVideoOptions} />,
		<FinalMessageStep progress={progress} />
	]

	const handleCancelUpload = () => {
		//TODO CANCEL UPLOAD
		setShowModal(false)
	}

	useEffect(() => {
		// When the user completed all the steps, send the data to the backend
		if (indexStep === steps.length) {
			//TODO SERVICE TO SEND DATA TO THE BACKEND 
			console.log(userVideoOptions);
		}

	}, [indexStep, userVideoOptions])

	
	// This emulates increasing of the progress bar
	useEffect(() => {
		if (progress <= 100)
			intervalRef.current = setTimeout(() => setProgress(prev => prev+1), 100)
		return () => {
			intervalRef.current && clearTimeout(intervalRef.current)
		}
	}, [progress])

	// When the modal renders, this blocks the scrolling of the page
	useEffect(() => {
		window.scrollTo(0, 0);
		document.body.style.overflow = 'hidden';
		return () => {
			document.body.style.overflow = 'unset';
		}
	}, [])


	return <div className="absolute inset-0 bg-black bg-opacity-30 z-40 h-screen">

		<DestructiveActionModal state={openCancelModal} title="Cancel Upload" setState={setOpenCancelModal} description="Do you really want to cancel the video upload?" onAccept={handleCancelUpload} actionButtonName="Yes" />

		<div className="relative top-36 max-w-4xl mx-auto px-2 md:px-8">
			<div className="bg-bg-2 rounded-xl shadow-md">
				<div>
					<ProgressBar progress={progress} />
				</div>
				<div className="mt-2 mx-1 sm:mx-6 flex items-center justify-between pt-2 pb-4">
					<button className={`text-font-icon hover:text-font-1 ${indexStep === 0 && "invisible"}`} onClick={() => indexStep > 0 && setIndexStep(prev => prev - 1)}>
						<span className="sr-only">Back</span>
						<ChevronLeftIcon className="h-7 w-7" aria-hidden="true" />
					</button>

					<button className="flex justify-center items-center text-font-icon hover:text-red-600 cursor-pointer">
						<span className="sr-only">Cancel Upload</span>
						<XIcon onClick={() => setOpenCancelModal(true)} className="h-7 w-7" aria-hidden="true" />
					</button>

				</div>
				<div className="pb-4 px-4 sm:px-8">
					<div>
						{ steps[indexStep] }
					</div>
				</div>
			</div>
		</div>
	</div>
}


export default function Dashboard() {
	const [showModal, setShowModal] = useState(false)
	const [fileDropEnter, setFileDropEnter] = useState(false)
 
	return (
		<>
			<DashboardWrapper pageTitle="New Project">

				{ showModal && <DashboardModal setShowModal={setShowModal} /> }
				<div>

					{/* UPLOAD FROM LINK REMOVED FOR NOW */}
					{/* <section  className="m-auto max-w-lg shadow-md rounded-xl bg-white uppercase pt-3 pb-6 px-10">
						<label htmlFor="" className="text-font-2 ml-1 text-sm">upload video via link</label>
						<div className="relative">
							<img className="absolute right-2 top-[5px]" alt="internet icon" src="assets/dashboard/internet-icon.svg"/>
							<input placeholder="https://example.com/video" className="w-full rounded-full px-4 pb-2.5" type="text" />
						</div>
					</section> */}

					{/* FILE DROPZONE */}
					<section className="max-w-5xl h-[620px] rounded-xl shadow-md mx-auto bg-white mt-6 relative p-4">

						{/* In this div there will be the actual dropzone */}
						<div onClick={() => setShowModal(prev => !prev)} onDragEnter={() => setFileDropEnter(true)} onDragLeave={() => setFileDropEnter(false)} className="absolute inset-4 z-20">
						</div>

						{/* Dropzone styling */}
						<div className={`w-full h-full border-dashed border-4 border-gray-200 rounded-lg transition-colors ${fileDropEnter && "bg-gray-100"}`}> 
							<div className="max-w-3xl mx-auto h-full flex justify-center items-center">
								<div className="flex flex-col items-center">
									
									<div className="uppercase text-sm font-bold text-font-icon">{fileDropEnter ? "drop here" :"upload your video here"}</div>
									<CloudUploadIcon className="w-20 h-20 mt-1 text-font-icon" />

								</div>
							</div>
						</div>

					</section>
				</div>

			</DashboardWrapper>
		</>
	);
}

