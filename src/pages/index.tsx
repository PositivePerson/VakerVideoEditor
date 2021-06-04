import { NextSeo } from 'next-seo';
import { CloudUploadIcon } from '@heroicons/react/solid';
import React, { RefObject, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import Header, { ModalProps } from '~/components/ui/Header';
import Image from 'next/image';
import { UploadModal } from '~/components/ui/UploadModal';
import Footer from '~/components/ui/Footer';
import AuthModal from '~/components/ui/AuthModal';
import { HomeCard } from '~/components/Home/Card';
import { motion } from 'framer-motion';
import { banner, stagger } from '~/utils/fadeInAnimation';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';

export default function Home() {
	/**
	 * * Hook for Nextjs Routing *
	 */
	const router = useRouter();
	/**
	 * * Router Query Params for i18n *
	 */
	const { locale, locales, defaultLocale } = router;

	const user = useSelector(({ user }: RootState) => user);

	let uploadButtonRef = useRef<any>();
	const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
	const [isAuthModalOpen, setIsAuthModalOpen] = useState<{
		state: boolean;
		action?: 'Login' | 'SignUp';
	}>({
		state: false,
		action: undefined,
	});
	return (
		<>
			<NextSeo
				title="VAKER.AI | The Tool to Easily Subtitle any Video Automatically"
				description="Automatically add subtitles or captions to your video in no time. Just upload your video and our generator will transcribe it. Style the subtitles and download the video according to your design wishes."
			/>
			<Header setIsAuthModalOpen={setIsAuthModalOpen} user={user} />
			<AuthModal
				state={isAuthModalOpen.state}
				action={isAuthModalOpen.action!}
				setState={setIsAuthModalOpen}
			/>
			<UploadModal
				initialFocus={uploadButtonRef}
				state={isUploadModalOpen}
				setState={setIsUploadModalOpen}
			/>
			<motion.div
				animate="animate"
				exit={{ opacity: 0 }}
				initial="initial"
				variants={stagger}
				className="mb-12"
			>
				<motion.div variants={banner} className="pb-12">
					<div className="relative w-full max-w-screen-xl mx-auto">
						<motion.div
							className="absolute left-0 block w-32 h-32 rounded-full top-12 md:w-52 md:h-52 opacity-60 sm:w-80 sm:h-80"
							style={{
								filter: 'blur(100px)',
								backgroundImage:
									'linear-gradient(132deg, #1D244B 27%, #78C3E6 50%, #6248ff 79%)',
								WebkitFilter: 'blur(100px)',
								msFilter: 'blur(100px)',
							}}
							animate={{ rotate: 0.2 }}
						/>
					</div>
					{/** Hero Content */}
					<div className="relative w-full pt-20 pb-32 shadow-lg md:pt-32 lg:pt-40">
						<div className="flex flex-col items-center w-full max-w-screen-md mx-auto">
							<h1 className="text-xl max-w-[290px] xs:max-w-[374px] xs:text-2xl sm:text-2xl font-bold text-center md:text-4xl sm:max-w-[540px] md:max-w-[700px] mt-6 mb-6">
								Add Subtitles Automatically To A Video With The Powerful Online
								Videoeditor.
							</h1>
							<p className="max-w-[290px] text-xs xs:max-w-[354px]  leading-5 font-normal text-center sm:max-w-[500px] sm:text-base">
								You simply upload your video and the AI will caption and
								synchronize the whole video. Styling and editing subtitles are
								easier than ever and can be done with a few clicks. You can even
								add a progress bar, headline, or logo. Your first video is on
								us.
							</p>
							<button
								ref={uploadButtonRef}
								className="flex flex-row items-center justify-center px-4 py-2 mt-12 mb-16 text-base font-semibold text-white uppercase border-none rounded-full outline-none focus:ring focus:outline-none focus:ring-blue-800 hover:opacity-90"
								style={{
									background: 'linear-gradient(to right, #1D244B, #78C3E6)',
								}}
								onClick={() => setIsUploadModalOpen(true)}
							>
								<CloudUploadIcon className="w-5 h-5 mr-2" />
								Upload your video
							</button>
						</div>
						<div className="relative flex items-center justify-center w-full pt-12 mx-auto max-w-7xl">
							<div className="w-full rounded-lg shadow-md">
								<Image
									objectFit="contain"
									layout="responsive"
									src={'/assets/editor.png'}
									loading="eager"
									priority={true}
									width={2000}
									height={1200}
									alt="Here is the clean interactive video and subtitle-editor displayed to play around. It is optimized for the desktop."
								/>
							</div>
						</div>
					</div>
					<div className="relative w-full mt-12">
						<div className="flex flex-col items-center max-w-screen-lg px-5 py-12 mx-auto sm:py-16">
							<h1 className="text-xl font-bold xs:text-2xl">
								No Video Editing Skills Required
							</h1>
							<div className="grid w-full max-w-screen-lg grid-cols-1 grid-rows-1 mt-12 md:gap-x-8 gap-y-8 md:gap-y-0 md:grid-cols-3">
								<div className="hidden col-span-3 md:block">
									<Image
										layout="responsive"
										height={300}
										width={1300}
										objectFit="contain"
										loading="eager"
										priority={true}
										src="/assets/upload-style-export-your-video.png"
										alt="The chain of three play-buttons symbolizes the upload, editing and download of your video."
									/>
								</div>
								<HomeCard
									imgSrc="/assets/upload-video.png"
									number={1}
									title="Upload Your Video"
									firstDescription="Upload any video in mp4, mov, .ogg, or .webm and let the artificial intelligence subtitle your video."
									secondDescription="Choose the language and after a couple of minutes your captions are ready."
								/>
								<HomeCard
									imgSrc="/assets/style-video.png"
									number={2}
									title="Style Your Video"
									firstDescription="Editing the auto generated subtitles is as easy as styling your video to make it ready for social media in just minutes."
									secondDescription="You can also crop the video, adjust the timing of subtitles, and use helpful tools to create your video efficiently."
								/>
								<HomeCard
									imgSrc="/assets/export-video.png"
									number={3}
									title="Export your video"
									firstDescription="Just choose the video quality you need and you can start the export of your subtitled video with just a few clicks."
									secondDescription="You can get notified when your video finishes and download it afterwards."
								/>
							</div>
							<div className="mt-12">
								<button
									className="flex flex-row items-center justify-center px-4 py-2 text-base font-semibold text-white uppercase border-none rounded-full outline-none focus:ring focus:outline-none focus:ring-blue-800 hover:opacity-90"
									style={{
										background: 'linear-gradient(to right, #1D244B, #78C3E6)',
									}}
									onClick={() => setIsUploadModalOpen(true)}
								>
									<CloudUploadIcon className="w-5 h-5 mr-2" />
									Upload your video
								</button>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>
			<Footer />
		</>
	);
}
