import React, { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'input'> {
	placeholder: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
	({ placeholder, type = 'text', ...props }, ref) => {
		return (
			<div>
				<input
					type={type}
					placeholder={placeholder}
					ref={ref}
					{...props}
					className="w-full h-12 px-4 text-base font-normal text-gray-900 border-none rounded outline-none bg-[#F5FAFE] focus:ring-2 focus:ring-blue-200 focus:z-10"
				/>

				<FieldError name={props.name} />
			</div>
		);
	},
);
