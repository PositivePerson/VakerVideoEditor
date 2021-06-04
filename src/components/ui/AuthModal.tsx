/* eslint-disable max-len */
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import React, { Fragment } from 'react';
import { login } from '~/utils/apiHelper';
import { FacebookIcon } from '../icons/FacebookIcon';
import { GoogleIcon } from '../icons/GoogleIcon';

interface Props {
	/**
	 * * Open / Close States
	 */
	state: boolean;
	action: 'Login' | 'SignUp';
	setState: (state: { state: boolean; action?: 'Login' | 'SignUp' }) => void;
}

const AuthModal: React.FC<Props> = ({ action, children, state, setState }) => {
	const router = useRouter();

	const googleSignIn = () => {
		const url = `http://localhost:3001/api/v1/auth/google`;

		window.location.replace(url);
	};
	const facebookSignIn = () => {
		const url = `http://localhost:3001/api/v1/auth/facebook`;

		window.location.replace(url);
	};
	return (
		<Transition show={state} as={Fragment}>
			<Dialog
				as="div"
				className="fixed inset-0 z-50 overflow-y-auto"
				static
				open={state}
				onClose={() =>
					setState({
						state: false,
						action: undefined,
					})
				}
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
						<div className="inline-flex flex-col items-center justify-between w-full h-full max-w-md px-4 pt-6 pb-4 mx-auto my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl md:pt-8 md:pb-8 md:px-8 lg:pt-12 lg:pb-10 lg:px-10 md:max-w-xl">
							<Dialog.Title
								as="h3"
								className="pb-4 text-2xl font-medium leading-6 text-gray-900 sm:text-3xl"
							>
								{action === 'Login' && 'Login'}
								{action === 'SignUp' && 'Sign up'}
							</Dialog.Title>
							<div className="flex flex-col justify-between w-full h-full max-w-md mt-4 max-h-96">
								<button
									type="button"
									className="inline-flex items-center mb-4 justify-center  w-full px-4 py-2 text-lg font-medium text-white bg-[#5389EA] border border-transparent rounded-full hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={() => googleSignIn()}
								>
									<div className="flex items-center justify-start w-full max-w-[14rem] text-left text-base">
										<div className="flex items-center justify-center w-6 h-6 mr-4 bg-white rounded-full">
											<GoogleIcon />
										</div>
										{action === 'Login' && 'Sign In'}
										{action === 'SignUp' && 'Sign Up'} with google
									</div>
								</button>
								<button
									type="button"
									className="inline-flex items-center justify-center w-full px-4 py-2 font-medium text-white bg-[#405992] border border-transparent rounded-full hover:bg-blue-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
									onClick={() => facebookSignIn()}
								>
									<div className="flex items-center justify-start w-full max-w-[14rem] text-left text-base">
										<div className="flex items-center justify-center w-6 h-6 mr-4 bg-white rounded-full">
											<FacebookIcon />
										</div>
										{action === 'Login' && 'Sign In'}
										{action === 'SignUp' && 'Sign Up'} with facebook
									</div>
								</button>
							</div>
							{action === 'SignUp' && (
								<p className="max-w-xl mt-12 text-xs text-center text-gray-700">
									<strong>
										We just use Google or Facebook to verify your account. We
										can’t access no other info than your email address.
									</strong>{' '}
									So your personal password for your account is never
									transferred to our service. No other data either.{' '}
									<a
										className="underline"
										target="_"
										rel="nofollow"
										href="https://www.youtube.com/watch?v=Y6E1GZckIko"
									>
										Here
									</a>{' '}
									is a video or an{' '}
									<a
										className="underline"
										target="_"
										rel="nofollow"
										href="https://www.avg.com/en/signal/is-it-safe-to-log-in-with-facebook-or-google"
									>
										article
									</a>{' '}
									that explains in a transparent way, what’s happening and why
									this is a secure way to sign up.
								</p>
							)}
						</div>
					</Transition.Child>
				</div>
			</Dialog>
		</Transition>
	);
};

export default AuthModal;
