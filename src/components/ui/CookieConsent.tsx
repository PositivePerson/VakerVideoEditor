import { Button } from './Button';
import CookieStorage from '~/utils/CookieStorage';
import { CookieOptionsModal } from './CookieOptionsModal';
import { useRef, useState } from 'react';

interface Props {
	loading: boolean;
	cookieState: boolean;
	setCookieState: (state: boolean) => void;
}

export const CookieConsent = ({
	cookieState,
	loading,
	setCookieState,
}: Props) => {
	let initialFocus = useRef<any>();
	const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
	const consentPropertyName = 'jdc_consent';

	const saveToStorage = () => CookieStorage.setValue(consentPropertyName, true);

	return (
		<>
			<CookieOptionsModal
				initialFocus={initialFocus}
				state={isOptionsOpen}
				setState={setIsOptionsOpen}
			/>
			{!cookieState && (
				<div className="fixed z-50 block p-4 mx-auto overflow-hidden text-white bg-gray-900 md:p-6 md:right-8 md:bottom-8 right-2 bottom-2 rounded-xl">
					{loading ? (
						<div className="relative flex flex-col px-4 py-2 space-y-2 animate-pulse">
							<div className="h-3 bg-gray-400 bg-opacity-25 rounded-lg w-28"></div>
							<div className="w-32 h-3 bg-gray-400 bg-opacity-25 rounded-lg"></div>
							<div className="w-24 h-3 bg-gray-400 bg-opacity-25 rounded-lg"></div>
						</div>
					) : (
						<div className="flex flex-col space-y-4">
							<div className="space-y-2">
								<h3 className="text-base font-normal text-center text-white sm:text-lg">
									We use cookies!
								</h3>
								<p className="text-sm font-normal sm:text-base ">
									To find out more, read our{' '}
									<a href="/privacy-policy" className="text-blue-400">
										privacy policy
									</a>
									.
								</p>
							</div>
							<div className="flex flex-row w-full space-x-2">
								<Button
									variant="dashed"
									onClick={() => {
										setIsOptionsOpen(true);
									}}
								>
									Manage Cookies
								</Button>
								<Button
									variant="secondary"
									onClick={() => {
										saveToStorage();
										setCookieState(true);
									}}
								>
									Accept All & continue
								</Button>
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};
