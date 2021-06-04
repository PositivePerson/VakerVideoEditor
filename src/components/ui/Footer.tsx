import React from 'react';
import NextLink from 'next/link';

interface Props {}

const Footer = ({}: Props) => {
	return (
		<footer className="absolute bottom-0 left-0 right-0 w-full py-2 px-3 sm:p-6 bg-[#425B7D]">
			<div className="flex items-center justify-between w-full max-w-full mx-auto sm:items-start md:max-w-screen-xl">
				<div className="flex flex-col items-center justify-center sm:flex-row">
					<div className="text-sm font-semibold text-white uppercase md:text-base">
						<NextLink href="/">2021 vaker</NextLink>
					</div>
					<p className="ml-3 text-xs font-medium text-gray-200">
						All rights reserved
					</p>
				</div>
				<nav className="flex items-center content-center text-xs text-white -translate-x-1/2 sm:text-sm left-1/2">
					<li className="mx-2 font-medium list-none md:mx-10 hover:text-blue-200">
						<NextLink href="/imprint">Imprint</NextLink>
					</li>
					<li className="mx-2 font-medium list-none md:mx-10 hover:text-blue-200">
						<NextLink href="/privacy-policy">Privacy Policy</NextLink>
					</li>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
