import { Switch } from '@headlessui/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { PricingCard } from '~/components/Pricing/Card';
import { Container } from '~/components/ui/Container';
import DashboardHeader from '~/components/ui/DashboardHeader';
import DashboardWrapper from '~/components/ui/DashboardWrapper';
import { Link } from '~/components/ui/Link';
import { pricingContent } from '~/constants/pricing-content';

export default function Upgrade() {
	const router = useRouter();
	const [enabled, setEnabled] = useState(false);

	const [isModalOpen, setIsModalOpen] = useState<{
		state: boolean;
		action?: 'Login' | 'SignUp';
	}>({
		state: false,
		action: undefined,
	});


	return (
		<DashboardWrapper pageTitle="Upgrade">
			<div className="px-4">

				<div className="mb-12">
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
				<div className="grid items-center w-full grid-cols-1 grid-rows-1 gap-5 md:grid-cols-2 mx-auto lg:grid-cols-3 xl:max-w-7xl">
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
			</div>

    </DashboardWrapper>
	);
}

