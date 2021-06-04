import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import AuthModal from '~/components/ui/AuthModal';
import Footer from '~/components/ui/Footer';
import Header from '~/components/ui/Header';
import { useSelector } from 'react-redux';
import { RootState } from '~/redux/rootStore';

export default function PrivacyPolicy() {
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
				title="Privacy Policy | VAKER.AI"
				description="Here we provide answers on how we handle your data when you visit our website and also after you signed up."
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
						Privacy Policy for vaker.ai
					</h1>
					<div className="w-full h-full max-w-screen-xl px-4 py-6 text-base font-normal leading-7 rounded-lg sm:px-12 sm:py-20 bg-blue-50">
						<p className="font-semibold">
							To give you a short and transparent overview. Here are the
							practical points of our privacy policy. For further details you
							can check out the whole text.
						</p>
						<div className="">
							<h2 className="mt-6 text-xl font-bold">Payment</h2>
							<p>
								We do not store your credit card details. We use one of the
								largest online payment solutions "Stripe" to process your
								payment. They store all the information you provide during
								payment, such as name and credit card number, on their servers.{' '}
								<br />
								We only have access to billing information, such as your name
								and address, and must store it when you make a purchase for 10
								years to be compliant with our national laws, like any other
								service or online store out there. <br />
								<br />
								Here is also the{' '}
								<a
									href="https://stripe.com/privacy"
									className="text-blue-700 underline"
									target="_"
									rel="nofollow"
								>
									privacy policy
								</a>{' '}
								from stripe.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Storage</h2>
							<p className="text-base">
								We store your data (that is mostly, all your video projects and
								transcripts) on Microsoft Azures servers, and we do the
								transcription of your videos there as well. When you delete a
								video project or your account, we also delete those videos and
								transcripts. Keep in mind that Microsoft Azure is based in the
								United States and is governed by U.S. law. <br />
								<br />
								<a
									href="https://privacy.microsoft.com/en-US/privacystatement"
									className="text-blue-700 underline"
									target="_"
									rel="nofollow"
								>
									Here
								</a>{' '}
								is also the privacy policy from Azure Microsoft.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Personal Infos</h2>
							<p className="text-base">
								If you signup we just store your email address and your name.
								<br />
								If you purchase a subscription we need to store the billing
								information for 10 years according to our national law.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">
								General usage of the website
							</h2>
							<p className="text-base">
								Vaker.ai collects general anonymous usage data to understand how
								users are using its service and especially our editor. If you
								use our website, we will store the usual anonymous data that
								most websites uses too. We use Google analytics as a help for
								that.
								<br />
								So for example: which editor function are used, how long the
								editor is used per session, in which quality people prefer to
								render their videos etc.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Contact Information</h2>
							<ul>
								<li>Email: help@vaker.ai</li>
								<li>K. Fischer UG (haftungsbeschränkt)</li>
								<li>Emmastraße 199</li>
								<li>Bremen 28213, Germany</li>
								<li>Geschäftsführer/ CEO: Leon Fischer</li>
								<li>VAT / USt-IdNr.: DE339417290</li>
							</ul>

							<p className="mt-2 text-base">
								At Vaker, accessible from https://vaker.ai, one of our
								priorities is the privacy of our visitors. This Privacy Policy
								document contains types of information that is collected and
								recorded by Vaker and how we use it.
							</p>
							<p className="text-base">
								If you have additional questions or require more information
								about our Privacy Policy, do not hesitate to contact us.
							</p>
							<p>
								This Privacy Policy applies only to our online activities and is
								valid for visitors to our website with regards to the
								information that they shared and/or collect in Vaker. This
								policy is not applicable to any information collected offline or
								via channels other than this website. Our Privacy Policy was
								created with the help of the
								<a
									href="https://www.privacypolicyonline.com/privacypolicy-generator/"
									className="text-blue-700 underline"
									rel="nofollow"
								>
									Online Generator of Privacy Policy
								</a>
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">
								Your data subject rights
							</h2>
							<ul>
								<li>
									You can exercise the following rights at any time using the
									contact details provided by us:
								</li>
								<li>
									Information about your data stored by us and its processing,
								</li>
								<li>Correction of incorrect personal data,</li>
								<li>Deletion of your data stored by us,</li>
								<li>
									Restriction of data processing if we are not yet allowed to
									delete your data due to legal obligations,
								</li>
								<li>objection to the processing of your data by us and</li>
								<li>
									Data portability, provided that you have consented to the data
									processing or have concluded a contract with us.
								</li>
								<li>
									If you have given us consent, you can revoke it at any time
									with effect for the future.
								</li>
							</ul>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Consent</h2>
							<p>
								By using our website, you hereby consent to our Privacy Policy
								and agree to its terms.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Information we collect</h2>
							<p>
								The personal information that you are asked to provide, and the
								reasons why you are asked to provide it, will be made clear to
								you at the point we ask you to provide your personal
								information.
							</p>
							<p>
								If you contact us directly, we may receive additional
								information about you such as your name, email address, phone
								number, the contents of the message and/or attachments you may
								send us, and any other information you may choose to provide.
							</p>
							<p>
								When you register for an Account, we may ask for your contact
								information, including items such as name, company name,
								address, email address, and telephone number.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">
								How we use your information
							</h2>
							<p>
								We use the information we collect in various ways, including to:
							</p>
							<ul>
								<li>Provide, operate, and maintain our website</li>
								<li>Improve, personalize, and expand our website</li>
								<li>Understand and analyze how you use our website</li>
								<li>
									Develop new products, services, features, and functionality
								</li>
								<li>
									Communicate with you, either directly or through one of our
									partners, including for customer service, to provide you with
									updates and other information relating to the website, and for
									marketing and promotional purposes
								</li>
								<li>Send you emails</li>
								<li>Find and prevent fraud</li>
							</ul>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Log Files</h2>
							<p>
								Vaker.ai follows a standard procedure of using log files. These
								files log visitors when they visit websites. All hosting
								companies do this and a part of hosting services' analytics. The
								information collected by log files include internet protocol
								(IP) addresses, browser type, Internet Service Provider (ISP),
								date and time stamp, referring/exit pages, and possibly the
								number of clicks. These are not linked to any information that
								is personally identifiable. The purpose of the information is
								for analyzing trends, administering the site, tracking users'
								movement on the website, and gathering demographic information.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">
								Cookies and Web Beacons
							</h2>
							<p>
								Like any other website, Vaker.ai uses 'cookies'. These cookies
								are used to store information including visitors' preferences,
								and the pages on the website that the visitor accessed or
								visited. The information is used to optimize the users'
								experience by customizing our web page content based on
								visitors' browser type and/or other information.
							</p>
							<p>
								For more general information on cookies, please read{' '}
								<a
									className="text-blue-700 underline"
									href="https://www.privacypolicyonline.com/what-are-cookies/"
									rel="nofollow"
								>
									"What Are Cookies" from Cookie Consent
								</a>
								.
							</p>
							<p>
								You can choose to disable cookies through your individual
								browser options.{' '}
							</p>
							<p>
								This website uses Google Analytics, a web analytics service
								provided by Google LLC, 1600 Amphitheatre Parkway, Mountain
								View, CA 94043 USA ( „Google“). Google Analytics uses "cookies"
								to help the website analyze how users use the site. The
								information generated by the cookie about your use of this
								website is usually transmitted to a Google server in the USA and
								stored there. Google processes your data in the USA and has
								submitted to the EU_US Privacy Shield
								https://www.privacyshield.gov/EU-US-Framework. The data is
								deleted as soon as it is no longer required for our recording
								purposes. The provision of your personal data is voluntary,
								based solely on your consent. If you prevent access, this may
								result in functional restrictions on the website.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">
								GDPR Data Protection Rights
							</h2>
							<p>
								We would like to make sure you are fully aware of all of your
								data protection rights. Every user is entitled to the following:
							</p>
							<p>
								The right to access – You have the right to request copies of
								your personal data. We may charge you a small fee for this
								service.
							</p>
							<p>
								The right to rectification – You have the right to request that
								we correct any information you believe is inaccurate. You also
								have the right to request that we complete the information you
								believe is incomplete.
							</p>
							<p>
								The right to erasure – You have the right to request that we
								erase your personal data, under certain conditions.
							</p>
							<p>
								The right to restrict processing – You have the right to request
								that we restrict the processing of your personal data, under
								certain conditions.
							</p>
							<p>
								The right to object to processing – You have the right to object
								to our processing of your personal data, under certain
								conditions.
							</p>
							<p>
								The right to data portability – You have the right to request
								that we transfer the data that we have collected to another
								organization, or directly to you, under certain conditions.
							</p>
							<p>
								If you make a request, we have one month to respond to you. If
								you would like to exercise any of these rights, please contact
								us.
							</p>
						</div>
						<div className="mt-6">
							<h2 className="mt-2 text-xl font-bold">Children's Information</h2>
							<p>
								Another part of our priority is adding protection for children
								while using the internet. We encourage parents and guardians to
								observe, participate in, and/ or monitor and guide their online
								activity.
							</p>
							<p>
								Vaker.ai does not knowingly collect any Personal Identifiable
								Information from children under the age of 13. If you think that
								your child provided this kind of information on our website, we
								strongly encourage you to contact us immediately and we will do
								our best efforts to promptly remove such information from our
								records.
							</p>
						</div>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}
