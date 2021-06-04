import React, { ComponentProps, forwardRef } from 'react';
import { FieldError } from './Form';

interface Props extends ComponentProps<'textarea'> {
	placeholder: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
	({ placeholder, className,...props }, ref) => {
		return (
			<div>
				<textarea
					className={`w-full px-4 py-2 text-base text-gray-900 border-none rounded-md outline-none h-60 bg-[#FCFCFC] focus:ring-blue-200 focus:ring-2 disabled:opacity-60 disabled:bg-gray-500 disabled:bg-opacity-20 ${className}`}
					ref={ref}
					placeholder={placeholder}
					{...props}
				/>

				<FieldError name={props.name} />
			</div>
		);
	},
);
