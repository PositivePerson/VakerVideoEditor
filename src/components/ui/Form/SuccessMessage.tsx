import { ReactNode } from 'react';

interface Props {
	children: ReactNode;
}

export function SuccessMessage({ children }: Props) {
	return (
		<div className="w-full max-w-md p-4 border-2 border-green-500 border-opacity-50 rounded-md bg-green-50 dark:bg-green-900 dark:bg-opacity-10">
			<div className="text-sm text-green-700 dark:text-green-200">
				{children}
			</div>
		</div>
	);
}
