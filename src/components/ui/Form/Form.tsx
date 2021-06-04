import React, { ComponentProps } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	useForm,
	UseFormProps,
	FormProvider,
	UseFormReturn,
	FieldValues,
	SubmitHandler,
	useFormContext,
} from 'react-hook-form';
import { ZodSchema, TypeOf } from 'zod';

/**
 * * Custom ZodForm Hook
 */
interface UseZodFormProps<T extends ZodSchema<any>>
	extends UseFormProps<TypeOf<T>> {
	schema: T;
}

export const useZodForm = <T extends ZodSchema<any>>({
	schema,
	...formConfig
}: UseZodFormProps<T>) => {
	return useForm({
		...formConfig,
		resolver: zodResolver(schema),
	});
};

/**
 * * Form Error Field
 */
interface FieldErrorProps {
	name?: string;
}

export function FieldError({ name }: FieldErrorProps) {
	const {
		formState: { errors },
	} = useFormContext();

	if (!name) {
		return null;
	}

	const error = errors[name];

	if (!error) {
		return null;
	}

	return (
		<div className="text-sm font-medium text-red-500">{error.message}</div>
	);
}

/**
 * * Form
 */
interface Props<T extends FieldValues = any>
	extends Omit<ComponentProps<'form'>, 'onSubmit'> {
	form: UseFormReturn<T>;
	onSubmit: SubmitHandler<T>;
}

export const Form = <T extends FieldValues>({
	form,
	onSubmit,
	children,
	...props
}: Props<T>) => {
	return (
		<FormProvider {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
				<fieldset
					className="flex flex-col space-y-4"
					disabled={form.formState.isSubmitting}
				>
					{children}
				</fieldset>
			</form>
		</FormProvider>
	);
};
