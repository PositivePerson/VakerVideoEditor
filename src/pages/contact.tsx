import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { motion } from 'framer-motion';
import ContactForm from '~/components/ui/ContactForm';


import Header from '~/components/ui/Header';
import AuthModal from '~/components/ui/AuthModal';
import Footer from '~/components/ui/Footer';
import { banner, stagger } from '~/utils/fadeInAnimation';
import { useRouter } from 'next/router';
import { PageTitle } from '~/components/ui/PageTitle';
import { ErrorMessage } from '~/components/ui/Form/ErrorMessage';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';

export default function Contact() {
	const router = useRouter();
	/**
	 * * Modal + Contact Request States
	 */
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
				title="Contact Us | VAKER.AI"
				canonical={router.pathname}
				description="If you have any question or feedback for us, you can contact us with a simple form or write us an email at ..."
			/>
			<Header setIsAuthModalOpen={setIsModalOpen} user={user} />
			<AuthModal
				state={isModalOpen.state}
				action={isModalOpen.action!}
				setState={setIsModalOpen}
			/>
			<motion.div
				animate="animate"
				exit={{ opacity: 0 }}
				initial="initial"
				variants={stagger}
				className="w-full h-full px-4 pt-20 pb-4 bg-white sm:py-20 lg:px-8 xl:px-12 md:py-32"
			>
				<motion.div
					variants={banner}
					className="relative flex flex-col items-center w-full max-w-screen-xl mx-auto mb-44"
				>
					<PageTitle title="Contact" />
					<ContactForm />	
				</motion.div>
			</motion.div>
			<Footer />
		</>
	);
}
