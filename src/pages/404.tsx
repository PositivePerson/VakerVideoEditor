import { Container } from '~/components/ui/Container';
import { Link } from '~/components/ui/Link';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function Custom404() {
	const router = useRouter();
	return (
		<>
			<NextSeo title="Error" canonical={router.pathname} />

			<Container title="404: Page Not Found">
				<div className="mb-2">This page could not be found.</div>
				<Link href="/">Back to Vaker.ai home.</Link>
			</Container>
		</>
	);
}
