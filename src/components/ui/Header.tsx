import React, { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, UserIcon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { IUserState } from '~/redux/user/user.reducer';

export type ModalProps = {
	state: boolean;
	name: string;
};

interface Props {
	setIsAuthModalOpen: (state: {
		state: boolean;
		action?: 'Login' | 'SignUp';
	}) => void;
	user: IUserState;
}

const Header = ({ setIsAuthModalOpen, user }: Props) => {
	const router = useRouter();
	/**
	 * * For Scroll Background FadeIn
	 */
	const [scroll, setScroll] = useState(false);
	useEffect(() => {
		window.addEventListener('scroll', () => {
			setScroll(window.scrollY > 50);
		});
	}, []);

	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Pricing', href: '/pricing' },
		{ name: 'Contact', href: '/contact' },
	];

	return (
		<Disclosure as="header" className="fixed top-0 z-50 w-full">
			{({ open }) => (
				<>
					<div className={'px-4 py-2 sm:px-8 ' + (scroll ? 'header' : '')}>
						<div className="w-full mx-auto text-base sm:text-lg xl:max-w-7xl md:max-w-4xl sm:max-w-full">
							<div className="flex items-center justify-between">
								<div className="flex flex-row items-center justify-center space-x-3 text-xl font-semibold uppercase">
									<NextLink href="/">
										<Image
											height={60}
											width={120}
											layout="intrinsic"
											loading="eager"
											priority={true}
											objectFit="contain"
											title="Vaker means Videomaker"
											className="z-50 w-20 cursor-pointer sm:w-28"
											src="/assets/LogoVaker.png"
											alt="The Vaker logo symbolizes Videomaker"
										/>
									</NextLink>
								</div>
								<div className="flex flex-row items-center justify-center">
									<nav className="items-center content-center hidden mr-12 text-sm md:text-base sm:flex ">
										<li className="mx-4 font-semibold list-none hover:text-blue-200">
											<NextLink href="/pricing">Pricing</NextLink>
										</li>
										<li className="mx-4 font-semibold list-none hover:text-blue-200">
											<NextLink href="/contact">Contact</NextLink>
										</li>
									</nav>
									{!user.isLoggedIn && (
										<>
											<button
												className="hidden px-5 py-1 mr-2 text-sm md:text-base font-semibold text-gray-900 transition-colors duration-150 border-none rounded-full outline-none sm:block hover:text-white hover:bg-[#425B7D] focus:outline-none"
												onClick={() =>
													setIsAuthModalOpen({
														state: true,
														action: 'Login',
													})
												}
											>
												Login
											</button>
											<button
												className="hidden px-4 py-1 text-sm md:text-base font-semibold text-gray-900 transition-colors duration-150 border border-gray-900 rounded-full outline-none sm:block hover:text-white hover:bg-[#425B7D] hover:border-[#425B7D] focus:outline-none"
												onClick={() =>
													setIsAuthModalOpen({
														state: true,
														action: 'SignUp',
													})
												}
											>
												Signup
											</button>
										</>
									)}
									{user.isLoggedIn && (
										<>
											<UserIcon className="w-12 h-12 mr-2" />
											<button
												className="hidden px-4 py-1 text-sm md:text-base font-semibold text-gray-900 transition-colors duration-150 border border-gray-900 rounded-full outline-none sm:block hover:text-white hover:bg-[#425B7D] hover:border-[#425B7D] focus:outline-none"
												onClick={() => alert('Du kommst hier ned raus')}
											>
												Logout
											</button>
										</>
									)}
									<div className="flex items-center sm:hidden">
										{/* Mobile menu button*/}
										<Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-white hover:bg-[#425B7D] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
											<span className="sr-only">Open main menu</span>
											{open ? (
												<XIcon className="block w-6 h-6" aria-hidden="true" />
											) : (
												<MenuIcon
													className="block w-6 h-6"
													aria-hidden="true"
												/>
											)}
										</Disclosure.Button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<Disclosure.Panel className="header sm:hidden">
						<div className="px-2 pt-2 pb-3 space-y-1">
							{navigation.map((item) => (
								<a
									key={item.name}
									href={item.href}
									className={clsx(
										'text-gray-800 hover:bg-[#425B7D] hover:text-white',
										'block px-3 py-2 rounded-md text-base font-medium',
									)}
									aria-current={router.pathname ? 'page' : undefined}
								>
									{item.name}
								</a>
							))}
							<div className="flex justify-between w-full pt-4 space-x-4">
								<button
									className="block w-full px-4 py-1 font-semibold text-gray-900 transition-colors duration-150 border border-gray-900 rounded-full outline-none hover:text-white hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-200"
									onClick={() => {
										setIsAuthModalOpen({
											state: true,
											action: 'Login',
										});
									}}
								>
									<Disclosure.Button className="w-full">
										Login
									</Disclosure.Button>
								</button>
								<button
									className="block w-full px-4 py-1 font-semibold text-gray-900 transition-colors duration-150 border border-gray-900 rounded-full outline-none hover:text-white hover:bg-blue-900 focus:outline-none focus:ring focus:ring-blue-200"
									onClick={() => {
										setIsAuthModalOpen({
											state: true,
											action: 'SignUp',
										});
									}}
								>
									<Disclosure.Button className="w-full">
										Sign up
									</Disclosure.Button>
								</button>
							</div>
						</div>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default Header;
