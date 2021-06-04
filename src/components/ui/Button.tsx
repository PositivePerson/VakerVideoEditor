import clsx from 'clsx';
import { ButtonOrLink, Props as ButtonOrLinkProps } from './ButtonOrLink';

export interface Props extends ButtonOrLinkProps {
	variant?: 'primary' | 'secondary' | 'dashed' | 'danger';
}

export function Button({ variant = 'primary', className, ...props }: Props) {
	return (
		<ButtonOrLink
			className={clsx(
				'flex text-[12px] sm:text-sm items-center w-full justify-center font-semibold px-2 sm:px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-offset-white dark:focus:ring-offset-black focus:ring-offset-1 disabled:opacity-60 disabled:pointer-events-none hover:bg-opacity-80',
				{
					'dark:bg-gray-900 bg-main text-white': variant === 'primary',
					'bg-white text-gray-900 focus:ring-gray-500 hover:bg-gray-50':
						variant === 'secondary',
					'bg-red-500 text-white focus:ring-red-500': variant === 'danger',
					'bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 hover:border-gray-900':
						variant === 'dashed',
				},
			) + " " + className}
			{...props}
		/>
	);
}
