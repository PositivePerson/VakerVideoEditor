import { useRouter } from 'next/router';
import ContactForm from '~/components/ui/ContactForm';
import DashboardWrapper from '~/components/ui/DashboardWrapper';
import { PageTitle } from '~/components/ui/PageTitle';

export default function Support() {
	const router = useRouter();

	return (
		<DashboardWrapper pageTitle="Support">
			<div className="px-2 sm:px-0">
				<div className="flex justify-center">
					<PageTitle title="Support" />

				</div>
				<ContactForm userPlan="PREMIUM" />
			</div>

    </DashboardWrapper>
	);
}

