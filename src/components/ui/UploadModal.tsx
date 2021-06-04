import { Transition, Dialog } from '@headlessui/react';
import { CloudUploadIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axiosInterceptor from '~/utils/axiosInterceptor';

interface Props {
	initialFocus: any;
	state: boolean;
	setState: (newState: boolean) => void;
}
export const UploadModal = ({ initialFocus, state, setState }: Props) => {
	const {
		getRootProps,
		getInputProps,
		isDragAccept,
		isDragActive,
		isDragReject,
		acceptedFiles,
		inputRef,
	} = useDropzone({
		accept: 'video/mp4',
	});
	const fileInputRef = useRef<any>();

	async function upload(files: any) {
		const config = {
			onUploadProgress: function (progressEvent: any) {
				var percentCompleted = Math.round(
					(progressEvent.loaded * 100) / progressEvent.total,
				);
				console.log(percentCompleted);
			},
		};

		let data = new FormData();
		data.append('file', files[0]);
	}
	return (
		<Transition show={state} as={Fragment}>
			<Dialog
				initialFocus={initialFocus}
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				static
				open={state}
				onClose={() => setState(false)}
			>
				<div className="min-h-screen px-4 text-center">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
					</Transition.Child>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>

					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						<div className="inline-flex flex-col font-medium items-center text-[#929292] justify-between w-full h-full max-w-md px-4 pt-6 pb-4 sm:px-12 sm:pt-20 sm:pb-12 mx-auto my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl md:max-w-3xl">
							<Dialog.Title
								as="h3"
								className="pb-4 text-lg leading-6 text-center uppercase"
							>
								Transcribe your first video for free
							</Dialog.Title>
							<div className="flex flex-col items-center justify-between w-full h-full mx-auto mt-4 space-x-4 text-lg uppercase max-h-96">
								{/* <CloudUploadIcon className="w-20 h-20" />
								<h6 className="">Upload your video here</h6> */}
								{acceptedFiles.length !== 0 ? (
									<div className="w-full">
										{acceptedFiles.map((file) => (
											<div className="flex flex-row items-center justify-between w-full max-w-[250px] mx-auto">
												<p className="normal-case">{file.name}</p>
												<button
													type="button"
													className="px-2 py-1 text-xs text-red-800 border border-red-500 rounded-md hover:bg-opacity-20 bg-red-50"
													onClick={() => {
														acceptedFiles.splice(0, acceptedFiles.length);
														if (inputRef.current) inputRef.current.value = '';
														setState(false);
													}}
												>
													Remove Upload
												</button>
											</div>
										))}
									</div>
								) : (
									<div
										{...getRootProps()}
										className={clsx(
											'flex items-center justify-center w-full h-48 max-w-md px-6 pt-5 pb-6 mt-1 bg-white border-2 border-gray-300 border-dashed rounded-md',
											{
												'bg-blue-50 bg-opacity-80': isDragAccept === true,
												'bg-red-50': isDragReject === true,
											},
										)}
									>
										<div className="flex flex-col items-center space-y-1 text-center">
											{!isDragAccept && !isDragReject && (
												<CloudUploadIcon className="w-12 h-12" />
											)}
											<div className="flex text-sm text-gray-600">
												<label
													htmlFor="workspaceCoverImages"
													className="relative font-medium text-[#929292] bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
												>
													{!isDragAccept && !isDragReject && (
														<span>Upload your video here</span>
													)}
													<input
														{...getInputProps()}
														// ref={fileInputRef}
														// onChange={async (event) => {
														// 	event.preventDefault();

														// 	try {
														// 		if (!event.currentTarget.files?.length) return;

														// 		const file = event.currentTarget.files[0];
														// 		const reader = new FileReader();

														// 		const result = await new Promise<any>(
														// 			(resolve, reject) => {
														// 				reader.readAsDataURL(new Blob([file]));
														// 				reader.onload = () => resolve(reader.result);

														// 				reader.onerror = () => reject(reader.error);
														// 			},
														// 		);
														// 	} catch (error) {
														// 		console.error(error);
														// 	}

														// 	// let fileReader = new FileReader();
														// 	// let file =
														// 	//   event.target.files &&
														// 	//   event.target.files[0];

														// 	// if (file) {
														// 	//   fileReader.onloadend = () => {
														// 	//     setImageFile({
														// 	//       file: file,
														// 	//       imagePreviewUrl:
														// 	//         fileReader.result,
														// 	//     });
														// 	//     console.log(imageFile?.file);
														// 	//     console.log(imageFile?.file.size);
														// 	//   };

														// 	//   fileReader.readAsDataURL(file);
														// 	//   setFieldValue(
														// 	//     'workspaceCoverImages',
														// 	//     imageFile,
														// 	//   );
														// 	// }

														// 	// setImageFile({
														// 	//   file:
														// 	//     event.currentTarget.files &&
														// 	//     event.currentTarget.files[0],
														// 	// });
														// }}
														className="sr-only"
													/>
													{isDragAccept && (
														<p className="z-20 text-sm text-blue-700 bg-blue-50">
															Drop it here!
														</p>
													)}
													{isDragReject && (
														<p className="z-20 text-sm text-red-700 bg-red-50">
															Invalid video format!
														</p>
													)}
												</label>
											</div>
											{!isDragAccept && !isDragReject && (
												<p className="text-xs text-[#929292] bg-opacity-80">
													MP4, MOV, AVI, WMV and WebM
												</p>
											)}
										</div>
									</div>
								)}
								{acceptedFiles.length !== 0 && (
									<button
										type="button"
										className="flex flex-row items-center justify-center px-4 py-2 mt-12 text-base font-semibold text-white uppercase border-none rounded-full outline-none focus:ring focus:outline-none focus:ring-blue-800 hover:opacity-90"
										style={{
											background: 'linear-gradient(to right, #1D244B, #78C3E6)',
										}}
										onClick={() => setState(false)}
									>
										Upload your video
									</button>
								)}
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};
