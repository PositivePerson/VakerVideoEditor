type Props = {
	seconds: number;
	className?: string;
};

const format = (seconds: number) => {
	const date = new Date(seconds * 1000);
	const hh = date.getUTCHours();
	const mm = date.getUTCMinutes().toFixed(2);
	const ss = date.getUTCSeconds().toFixed(2);

	return `${hh ? `${hh}:` : ''}${mm}:${ss}`;
};

const Duration = ({ seconds, className }: Props) => (
	<time dateTime={`P${Math.round(seconds)}S`} className={className}>
		{format(seconds)}
	</time>
);

export default Duration;
