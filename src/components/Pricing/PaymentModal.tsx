/* eslint-disable max-len */
import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface Props {
	status: 'SUCCESS' | 'CANCELED' | 'FAILED';
	/**
	 * * Open / Close States
	 */
	state: boolean;
	setState: (state: boolean) => void;
}

const PaymenModal = ({ status, state, setState }: Props) => {
	return (
		<Transition show={state} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-20 overflow-y-auto"
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
						<div className="inline-block w-full max-w-md px-8 py-12 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
							<Dialog.Title
								as="h3"
								className="text-3xl font-medium leading-6 text-gray-900"
							>
								{status === 'SUCCESS'
									? 'Payment Success'
									: status === 'CANCELED'
									? 'Payment Canceled'
									: 'Oops .. An Error occurred'}
							</Dialog.Title>
							<div className="mt-2">
								<p className="text-sm text-gray-500">
									{status === 'SUCCESS'
										? 'Your payment has been successfully submitted. We’ve sent your an email with all of the details of your order.'
										: status === 'CANCELED'
										? 'Your payment was canceled.'
										: 'Oops .. An Error occurred'}
								</p>
							</div>

							<div className="mt-4">
								<button
									type="button"
									className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={() => setState(false)}
								>
									Got it, thanks!
								</button>
							</div>
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default PaymenModal;
