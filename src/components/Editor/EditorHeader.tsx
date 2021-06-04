import React, { Fragment } from 'react';
import NextLink from 'next/link';
import { Disclosure, Popover, Transition } from '@headlessui/react';
import { useRouter } from 'next/router';
import { navigation } from "../ui/DashboardHeader"
import { ChevronDownIcon, MenuIcon, XIcon } from '@heroicons/react/solid';

interface NavItemProps {
	label: string;
	href: string;
}

const NavItem = ({ label, href }: NavItemProps) => {
  const { route } = useRouter()

  return <NextLink href={href}>
    <div className="flex flex-col px-0 cursor-pointer justify-center md:items-center text-xl font-semibold uppercase">
      <div className="md:text-center mb-1.5 text-xs font-bold text-font-1 tracking-wider">{ label }</div>
      <div className={`${route === href ? "bg-gradient-to-tr opacity-75 from-main to-blue-dashboard shadow-md" : "bg-font-1"} w-full rounded-full h-1 inline-block`}></div>
    </div>
  </NextLink>
}

const PopoverNav = () => {
	return (
		<Popover className="relative z-50">
        {({ open }) => (
          <>
            <Popover.Button
              className="inline-flex items-center justify-center p-2 text-gray-800 rounded-md hover:text-white hover:bg-[#425B7D] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
							{open ? (
								<XIcon className="block w-6 h-6" aria-hidden="true" />
							) : (
								<MenuIcon
									className="block w-6 h-6"
									aria-hidden="true"
								/>
							)}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute mt-3 w-36 transform -translate-x-full md:-translate-x-3/4 left-1/2 ring-1 ring-black ring-opacity-5 bg-white rounded-lg shadow-lg">
                <div className="overflow-hidden px-2 py-8">
										<nav className="space-y-4">
											{ navigation.map(item => (
												<NavItem key={item.href} href={item.href} label={item.label} />
											)) }
										</nav>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
	)
}

interface PopoverExportProps {
	setIsSRTModalOpen: (arg0: boolean) => void;
	setIsExportModalOpen: (arg0: boolean) => void;

}

const PopoverExport = ({ setIsSRTModalOpen, setIsExportModalOpen }: PopoverExportProps) => {
	return (
		<Popover className="relative z-50">
			{({ open }) => (
				<>
					<Popover.Button className="flex items-center justify-center space-x-1 bg-white px-4 py-2 md:pr-4 md:pl-6 md:py-3 shadow-md rounded-lg focus:outline-none hover:bg-gray-100 text-font-1 uppercase font-extrabold">
						<img className="relative bottom-0.5 mr-2" width="25px" height="25px" alt="export icon" aria-hidden="true" src="/assets/editor/export.svg"/>
						<div className="hidden md:block">exporting</div>
						<ChevronDownIcon className="h-4 w-4 hidden md:block" aria-hidden="true" />
					</Popover.Button>
					<Transition
						as={Fragment}
						enter="transition ease-out duration-200"
						enterFrom="opacity-0 translate-y-1"
						enterTo="opacity-100 translate-y-0"
						leave="transition ease-in duration-150"
						leaveFrom="opacity-100 translate-y-0"
						leaveTo="opacity-0 translate-y-1"
					>
						<Popover.Panel className="absolute mt-3 w-[160px] md:w-full transform -translate-x-1/2 left-1/2 ring-1 ring-black ring-opacity-5 bg-white rounded-lg shadow-lg">
							<div className="flex flex-col font-extrabold py-6 text-center">
								<button onClick={() => setIsSRTModalOpen(true)} className="py-4 font-extrabold focus:outline-none focus:ring hover:bg-bg-3 cursor-pointer focus:ring-blue-200">.SRT file</button>
								<button className="py-4 font-extrabold focus:outline-none focus:ring hover:bg-bg-3 cursor-pointer focus:ring-blue-200">.txt file</button>
								<button onClick={() => setIsExportModalOpen(true)} className="py-4 font-extrabold focus:outline-none focus:ring hover:bg-bg-3 cursor-pointer focus:ring-blue-200">- Export Video -</button>
							</div>
						</Popover.Panel>
					</Transition>
				</>
			)}
		</Popover>
	)
}

interface EditorHeaderProps {
	projectName?: string;
	setIsSRTModalOpen?: (arg0: boolean) => void;
	setIsExportModalOpen?: (arg0: boolean) => void;
	exportPage?: boolean;
}


const EditorHeader = ({ projectName, setIsSRTModalOpen, setIsExportModalOpen, exportPage }: EditorHeaderProps) => {
	const router = useRouter();

	

	return (
		<header className="absolute top-0 z-30 w-full bg-bg-3 bg-opacity-70 overflow-visible backdrop-filter backdrop-blur-lg">
			<div
				className="sm:px-8 lg:px-12 max-w-[1900px] mx-auto overflow-visible py-6"
			>
				<div className="grid grid-cols-3 items-center">
					<div>
					
						<NextLink href="/">
							<img
								className="z-50 cursor-pointer w-28"
								src="/assets/LogoVaker.png"
								alt="Logo"
							/>
						</NextLink>
						
					</div>

					<div className="text-lg text-center md:text-2xl font-extrabold place-self-center max-w-md truncate">
						{ projectName }
						{ exportPage && <div className="uppercase text-sm">-Export-</div>}
					</div>
					

					<div className="flex items-center justify-end space-x-6">
						{
							!exportPage && setIsSRTModalOpen && setIsExportModalOpen && (
								<PopoverExport setIsSRTModalOpen={setIsSRTModalOpen} setIsExportModalOpen={setIsExportModalOpen} />
							)
						}
						<PopoverNav />
					
					</div>

					
				</div>
			</div>
					
		</header>
	);
};

export default EditorHeader;
