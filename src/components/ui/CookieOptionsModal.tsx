import { Switch, Transition, Dialog } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment, useRef, useState } from 'react';
import { Button } from './Button';

const options: CookieOption[] = [
	{
		id: 'id-essential',
		value: 'ESSENTIAL',
		label: 'Esential Cookies',
		disabled: true,
		category: 'Technical (Required)',
		description:
			'Technically required cookies ensure functions, without which a user can not use our website as intended. The legal basis for this collection and processing is our legitimate interest.',
	},
	{
		id: 'id-all',
		value: 'ALL',
		label: 'Accept All Cookies',
		disabled: false,
		category: 'Commercial',
		description:
			'Hereby, you enable us to understand how you use the website and can thus adapt the service even better to the user interests. These cookies used for this purpose allow us to count visits and traffic sources so that we can document and improve the performance of our website as well. The legal basis for this collection and processing is your consent.',
	},
];

type Cookie = 'ESSENTIAL' | 'ALL';
interface CookieOption {
	id: string;
	value: Cookie;
	label: string;
	disabled: boolean;
	category: string;
	description: string;
}

interface Props {
	initialFocus: any;
	state: boolean;
	setState: (newState: boolean) => void;
}
export const CookieOptionsModal = ({ state, setState }: Props) => {
	const initialFocus = useRef<any>();
	const [option, setOption] = useState<Cookie>('ESSENTIAL');

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
				<div className="min-h-screen px-4 pb-2 text-center">
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
						<div className="inline-flex flex-col items-center justify-between w-full h-full max-w-md px-4 pt-6 pb-12 mx-auto my-8 overflow-hidden font-medium text-left text-gray-900 align-middle transition-all transform bg-white rounded-lg shadow-xl md:pt-12 md:px-8 lg:pt-20 lg:px-12 m md:max-w-2xl">
							<Dialog.Title
								as="h3"
								className="pb-4 text-lg font-bold leading-6"
							>
								Cookie Preferences
							</Dialog.Title>
							<div className="flex flex-col items-center justify-between w-full h-full mx-auto mt-4 overflow-x-hidden overflow-y-auto text-lg ">
								<div className="mb-4">
									<fieldset>
										{options.map((optionItem, index) => (
											<div
												key={optionItem.id}
												className={clsx(
													'flex items-center justify-between w-full',
													{ 'mt-4': index !== 0 },
												)}
											>
												<div className="flex flex-col space-y-2">
													<div className="flex flex-row items-center justify-between">
														<h6 className="text-base font-semibold md:text-lg">
															{optionItem.category}
														</h6>
														<SwitchButton
															disabled={optionItem.disabled}
															initialState={optionItem.disabled ? true : false}
														/>
													</div>
													<p className="max-w-xs text-xs leading-5 sm:max-w-md">
														{optionItem.description}
													</p>
												</div>
											</div>
										))}
									</fieldset>
								</div>
								<div className="flex flex-row items-center w-full m-0">
									<Button
										variant="secondary"
										onClick={() => {
											// TODO: Update Functionality
											console.log('saved preferences');
											setState(false);
										}}
									>
										Save Preferences
									</Button>
									<Button
										variant="primary"
										onClick={() => {
											// TODO: Update Functionality
											console.log('saved preferences');
											setState(false);
										}}
									>
										Accept all Cookies
									</Button>
								</div>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

interface SwitchButtonProps {
	initialState: boolean;
	disabled: boolean;
}
export default function SwitchButton({
	disabled,
	initialState,
}: SwitchButtonProps) {
	const [enabled, setEnabled] = useState(initialState);

	return (
		<div className="pt-2 sm:pb-4">
			<Switch
				checked={enabled}
				disabled={disabled}
				onChange={setEnabled}
				className={`${enabled ? 'bg-[#425B7D]' : 'bg-gray-200'}
          relative inline-flex flex-shrink-0 h-[28px] sm:h-[38px] w-[64px] sm:w-[74px] border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Use setting</span>
				<span
					aria-hidden="true"
					className={`${enabled ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[24px] w-[24px] sm:h-[34px] sm:w-[34px] rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
				/>
			</Switch>
		</div>
	);
}
