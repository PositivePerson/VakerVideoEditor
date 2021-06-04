import Image from 'next/image';
interface Props {
	number: number;
	imgSrc: string;
	title: string;
	firstDescription: string;
	secondDescription: string;
}

export const HomeCard = ({
	number,
	title,
	firstDescription,
	secondDescription,
	imgSrc,
}: Props) => {
	return (
		<div className="flex flex-col items-center justify-start">
			<div className="relative block w-44 md:hidden md:w-32">
				<Image
					height={500}
					width={1200}
					objectFit="contain"
					layout="responsive"
					loading="eager"
					priority={true}
					src={imgSrc}
					alt={`An icon that symbolizes the upload `}
				/>
			</div>

			<h6 className="max-w-sm mb-4 text-xl font-bold">
				{number}. {title}
			</h6>
			<div className="flex flex-col items-center space-y-3">
				<p className="w-full max-w-xs text-xs font-normal text-center sm:max-w-[18rem] sm:text-sm">
					{firstDescription}
				</p>
				<p className="w-full max-w-xs text-xs font-normal text-center sm:max-w-sm sm:text-sm">
					{secondDescription}
				</p>
			</div>
		</div>
	);
};
