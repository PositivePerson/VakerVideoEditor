import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AuthModal from '~/components/ui/AuthModal';
import Footer from '~/components/ui/Footer';
import Header from '~/components/ui/Header';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';

export default function Imprint() {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState<{
		state: boolean;
		action?: 'Login' | 'SignUp';
	}>({
		state: false,
		action: undefined,
	});

	const user = useSelector(({ user }: RootState) => user);

	return (
		<>
			<NextSeo
				title="Imprint | VAKER.AI"
				description="All legal informations are here."
				noindex
				canonical={router.pathname}
			/>
			<Header
				setIsAuthModalOpen={setIsModalOpen}
				user={user}
			/>
			<AuthModal
				state={isModalOpen.state}
				action={isModalOpen.action!}
				setState={setIsModalOpen}
			/>
			<div className="relative w-full max-w-screen-xl pt-20 pb-12 mx-auto mb-14 sm:pt-32">
				<div className="flex flex-col p-4 space-y-4 sm:p-0">
					<h1 className="text-3xl font-semibold text-center sm:text-5xl">
						Imprint
					</h1>
					<h2 className="text-lg font-medium text-center sm:text-2xl">
						Information according to § 5 TMG
					</h2>
					<div className="w-full h-full max-w-screen-xl px-4 py-6 text-base font-normal leading-7 rounded-lg sm:px-12 sm:py-20 bg-blue-50">
						<p className="font-semibold">
							Imprint/ <br />
							Impressum
						</p>
						<p className="mt-6">
							Angaben nach § 5 TMG <br />
							Information according to § 5 TMG
						</p>
						<p className="mt-6">
							K. Fischer UG (haftungsbeschränkt) <br />
							Emmastraße 199 <br />
							Bremen 28213 Germany <br />
							Geschäftsführer/ CEO: Leon Fischer
						</p>
						<p className="mt-6">VAT / USt-IdNr.: DE339417290</p>
						<p className="mt-6">
							Registergericht: Amtsgericht Bremen <br />
							Handelsregister: HRB 36278 HB
						</p>
						<p className="mt-6">
							Telefon/Phone: +49 0421 40898206 <br />
							Email: <strong>help@vaker.ai</strong>
						</p>
						<p className="mt-8">
							<a className="text-blue-700 underline break-words">
								https://ec.europa.eu/consumers/odr/main/index.cfm
							</a>
							<br />
							Die K. Fischer UG (haftungsbeschränkt) ist nicht bereit oder
							verpflichtet am <br />
							Verbraucherschlichtungsverfahren teilzunehmen. <br />
							K. Fischer UG (haftungsbeschränkt) is not willing or obliged to
							participate in consumer <br />
							arbitration proceedings.
						</p>
					</div>
				</div>
			</div>
			<Footer />
		</>
	);
}
