import React from 'react';
import { CheckCircleIcon, MailIcon } from '@heroicons/react/solid';

import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';
import { PhoneIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';

export type CardInput = {
	id: string;
	plan: string;
	monthlyPriceId: string;
	monthlyPrice: number;
	yearlyPriceId: string;
	yearlyPrice: number;
	recommended?: boolean;
	currency?: string;
	features: string[];
	chatSupport: boolean;
	liveSupport: boolean;
	description: string;
	onClick?: () => void;
	action: string;
};

interface Props {
	subscriptionState: 'MONTHLY' | 'YEARLY';
	content: CardInput;
	modalState: boolean;
	setModalState: (state: {
		state: boolean;
		action?: 'Login' | 'SignUp';
	}) => void;
}
export const PricingCard = (props: Props) => {
    const isAuthenticated = useSelector(({ user }: RootState) => user);

	const stripe = useStripe();

	const handleClick = async (event: any) => {
		event.preventDefault();

		const YOUR_DOMAIN = 'http://localhost:3000';

		const response = await axios.post(
			'http://localhost:3001/api/v1/stripe/create-checkout-session',
			{
				successUrl: `${YOUR_DOMAIN}/pricing?successs=true`,
				cancelUrl: `${YOUR_DOMAIN}/pricing?canceled=true`,
				priceId:
					props.subscriptionState === 'MONTHLY'
						? props.content.monthlyPriceId
						: props.content.yearlyPriceId,
			},
			{
				headers: { Authorization: `Bearer ${isAuthenticated.jwtToken}` },
			},
		);

		if (response.status === 500) {
			console.error(response.data.error);
		}

		// When the customer clicks on the button, redirect them to Checkout.
		const result = await stripe?.redirectToCheckout({
			sessionId: response.data.sessionId,
		});

		if (result && result.error) {
			// If `redirectToCheckout` fails due to a browser or network
			// error, display the localized error message to your customer
			// using `result.error.message`.
			console.error(result.error);
		}
	};
	return (
		<div
			className={`relative w-full px-4 py-4 lg:py-12 border border-gray-300 rounded-xl lg:max-w-md ${
				props.content.recommended
					? `bg-indigo-700 text-white`
					: 'bg-white text-gray-900'
			}`}
		>
			<div className="flex flex-col items-center justify-between space-y-2 ">
				{props.content.recommended === true && (
					<div className="absolute hidden px-2 py-1 text-xs text-blue-700 bg-white border-2 border-blue-700 rounded-full xs:block sm:px-4 sm:py-2 top-4 right-4">
						Recommended
					</div>
				)}
				<div className="w-full max-w-[10rem] space-y-3 text-center">
					<div>
						{/* eslint-disable-next-line max-len */}
						<h3
							className={`text-xl sm:text-3xl font-medium ${
								props.content.recommended ? 'text-white' : 'text-gray-900'
							}`}
						>
							{props.content.plan}
						</h3>
						<p className="text-sm font-normal sm:text-base">
							{props.content.description}
						</p>
					</div>
					<div>
						<div className="relative w-full">
							<div className="flex items-center justify-center">
								<p className="text-2xl">
									{props.subscriptionState === 'MONTHLY'
										? props.content.monthlyPrice
										: props.subscriptionState === 'YEARLY'
										? props.content.yearlyPrice
										: ''}{' '}
									{props.content.currency ?? '$'}
								</p>
								<p
									className={clsx(
										'text-sm ml-1',
										{ 'text-gray-200': props.content.recommended },
										{ 'text-gray-500': !props.content.recommended },
									)}
								>
									/mo.
								</p>
							</div>
							{props.subscriptionState === 'YEARLY' && (
								<div className="absolute top-0 w-12 px-1 m-0 text-sm font-normal text-blue-700 line-through bg-white border border-blue-700 rounded-full -right-2">
									{props.content.monthlyPrice}$
								</div>
							)}
						</div>
						{props.subscriptionState === 'YEARLY' && (
							<p
								className={clsx(
									'text-sm',
									{ 'text-gray-200': props.content.recommended },
									{ 'text-gray-500': !props.content.recommended },
								)}
							>
								Billed {props.content.yearlyPrice * 12}$ annually
							</p>
						)}
					</div>
				</div>
				<div
					className={`flex flex-col  justify-center items-center lg:items-start w-full px-2 md:px-4 lg:px-6 xl:px-12 space-y-4 h-72 sm:h-96 rounded-lg ${
						props.content.recommended ? 'bg-indigo-800' : 'bg-blue-50'
					}`}
				>
					{props.content.features.map((feature, index) => (
						<div
							key={index}
							className="flex flex-row items-center max-w-md space-x-1 sm:space-x-3"
						>
							<CheckCircleIcon className="w-5 h-5 opacity-70" />
							<p className="text-base font-medium md:text-lg">{feature}</p>
						</div>
					))}
					<hr />
					{props.content.chatSupport && (
						<div className="flex flex-row items-center space-x-3">
							<MailIcon className="w-5 h-5" />
							<p>Email Support</p>
						</div>
					)}
					{props.content.liveSupport && (
						<div className="flex flex-row items-center space-x-3">
							<PhoneIcon className="w-5 h-5" />
							<p>Live Support</p>
						</div>
					)}
				</div>
				<div className="relative block pt-5">
					<button
						type="button"
						id="checkout-button"
						role="link"
						onClick={(e) =>
							isAuthenticated
								? handleClick(e)
								: props.setModalState({ state: true, action: 'Login' })
						}
						className={`px-12 py-3 font-semibold uppercase transition-colors duration-200 border-none rounded-lg  ${
							props.content.recommended
								? // ? 'text-white border-white hover:bg-white hover:text-indigo-800'
								  'text-indigo-800 bg-white hover:bg-indigo-100'
								: // : 'border-blue-700 text-blue-900 hover:text-white hover:bg-blue-700'
								  'bg-indigo-800 border-none text-white hover:opacity-80'
						}`}
					>
						{props.content.action}
					</button>
				</div>
			</div>
		</div>
	);
};
