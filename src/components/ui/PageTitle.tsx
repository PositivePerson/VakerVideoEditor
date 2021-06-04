import { ComponentProps } from 'react';

type TitleProps = ComponentProps<'h1'>;
interface Props extends TitleProps {
	title: string;
}
export const PageTitle = ({ title, ...props }: Props) => {
	return (
		<h1 className="text-3xl font-semibold sm:text-5xl" {...props}>
			{title}
		</h1>
	);
};
