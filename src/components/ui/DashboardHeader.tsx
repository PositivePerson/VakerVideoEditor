import React from 'react';
import NextLink from 'next/link';
import { Disclosure } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import PATHS from '../../constants/paths'




// Labels are uppercased automatically
export const navigation = [
	{
		href: PATHS.DASHBOARD.MY_PROJECTS,
		label: "my projects"
	},
	{
		href: PATHS.DASHBOARD.UPGRADE,
		label: "upgrade"
	},
	{
		href: PATHS.DASHBOARD.BILLING,
		label: "billing",
	},
	{
		href: PATHS.DASHBOARD.SUPPORT,
		label: "support"
	}
]

interface Props {
	label: string;
	href: string
}

const NavItem = ({ label, href }: Props) => {
  const { route } = useRouter()

  return <NextLink href={href}>
    <div className="flex flex-col px-4 sm:px-8 md:px-0 cursor-pointer justify-center md:items-center text-xl font-semibold uppercase">
      <div className="md:text-center mb-1.5 text-xs font-bold text-font-1 tracking-wider">{ label }</div>
      <div className={`${route === href ? "bg-gradient-to-tr opacity-75 from-main to-blue-dashboard shadow-md" : "bg-font-1"} w-36 sm:w-28 rounded-full h-1 inline-block`}></div>
    </div>
  </NextLink>
}

const DashboardHeader = () => {
	const router = useRouter();

	return (
		<Disclosure as="header" className="fixed top-0 z-30 w-full bg-bg-1 bg-opacity-70 backdrop-filter backdrop-blur-lg">
			{({ open }) => (
				<>
					<div
						className="sm:px-8 lg:px-12 max-w-[1900px] mx-auto overflow-hidden py-6"
					>
						<div className="flex justify-between">
							<div className="flex items-center">
								<NextLink href="/">
									<img
										className="z-50 cursor-pointer w-28"
										src="/assets/LogoVaker.png"
										alt="Logo"
									/>
								</NextLink>
								
							</div>
							<div className="hidden md:flex md:space-x-8">
								{ navigation.map(item => (
									<div key={item.href} className="flex flex-row items-center justify-center space-x-3">
										<NavItem href={item.href} label={item.label} />
									</div>
								)) }
							
							</div>

							<div className="flex items-end justify-end md:hidden">
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
					<Disclosure.Panel className="md:hidden">
						<nav className="space-y-4 py-6">
						{ navigation.map(item => (
							<NavItem key={item.href} href={item.href} label={item.label} />
						)) }
						</nav>
					</Disclosure.Panel>
				</>
			)}
		</Disclosure>
	);
};

export default DashboardHeader;
