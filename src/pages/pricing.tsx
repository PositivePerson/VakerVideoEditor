import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { CardInput, PricingCard } from '~/components/Pricing/Card';
import AuthModal from '~/components/ui/AuthModal';
import PaymenModal from '~/components/Pricing/PaymentModal';
// import { ParsedUrlQuery } from 'node:querystring';
import Header from '~/components/ui/Header';
import Footer from '~/components/ui/Footer';
import { motion } from 'framer-motion';
import { banner, stagger } from '~/utils/fadeInAnimation';
import { PageTitle } from '~/components/ui/PageTitle';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';
import { pricingContent } from '~/constants/pricing-content';


interface Props {}
// interface PaymentProps extends ParsedUrlQuery {
// 	success: string;
// }

export default function Pricing({ ...props }: Props) {
	//   const state: any = useSelector((state) => state)
	const router = useRouter();
	const [enabled, setEnabled] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState<{
		state: boolean;
		action?: 'Login' | 'SignUp';
	}>({
		state: false,
		action: undefined,
	});
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const { success } = router.query;
	const { canceled } = router.query;

	const user = useSelector(({ user }: RootState) => user);

	return (
		<>
			<NextSeo
				title="Pricing- Your First Video Is On Us | VAKER.AI"
				description="We offer a free trial without limitation for one video. This way you can fully experience the timesaving benefits and the easy workflow. Afterwards you can choose one of three  easy to understand pricing plans, that fit your needs."
				canonical={router.pathname}
			/>
			<Header
				setIsAuthModalOpen={setIsModalOpen}
				user={user}
			/>
			<motion.div
				animate="animate"
				exit={{ opacity: 0 }}
				initial="initial"
				variants={stagger}
				className="w-full h-full px-4 pt-20 pb-12 bg-white lg:pt-32"
			>
				<AuthModal
					state={isModalOpen.state}
					action={isModalOpen.action!}
					setState={setIsModalOpen}
				/>
				{canceled !== undefined ||
					(success !== undefined && (
						<PaymenModal
							status={
								success === 'true'
									? 'SUCCESS'
									: canceled === 'true'
									? 'CANCELED'
									: success === 'false'
									? 'CANCELED'
									: 'FAILED'
							}
							state={isPaymentModalOpen}
							setState={setIsPaymentModalOpen}
						/>
					))}
				<motion.div
					variants={banner}
					className="flex flex-col items-center justify-center w-full pb-20 space-y-10"
				>
					<div className="space-x-5">
						{/* <h1 className="mb-4 text-2xl font-semibold text-center sm:text-5xl">
							Pricing
						</h1> */}
						<PageTitle
							title="Pricing"
							className="text-3xl font-semibold text-center sm:text-5xlmb-4"
						/>
						<p className="mb-3 text-base font-normal sm:text-lg ">
							Choose your subscription model
						</p>
						<div
							className="flex items-center justify-center w-full"
							style={{ margin: 0 }}
						>
							<Switch
								checked={enabled}
								onChange={setEnabled}
								className={`${
									enabled ? 'bg-indigo-600' : 'bg-gray-200'
								} relative inline-flex items-center rounded-full m-0 w-44 py-1 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
							>
								<span
									className={`${
										enabled ? 'translate-x-[74px]' : 'translate-x-1'
									} py-2 text-base w-24 transform bg-white rounded-full transition-transform`}
								>
									{enabled ? 'Yearly' : 'Monthly'}
								</span>
							</Switch>
						</div>
					</div>
					<div className="grid items-center w-full grid-cols-1 grid-rows-1 gap-5 justify-items-center lg:grid-cols-3 xl:max-w-7xl">
						{pricingContent.map((card, _) => (
							<PricingCard
								key={card.id}
								subscriptionState={enabled ? 'YEARLY' : 'MONTHLY'}
								content={card}
								modalState={isModalOpen.state}
								setModalState={setIsModalOpen}
							/>
						))}
					</div>
				</motion.div>
			</motion.div>
			<Footer />
		</>
	);
}
