import { DefaultSeo } from 'next-seo';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { CookieConsent } from '~/components/ui/CookieConsent';
import { wrapper } from '~/redux/rootStore';
import CookieStorage from '~/utils/CookieStorage';
import "antd/dist/antd.css"
import '../styles.css';

const stripePromise = loadStripe(process.env.STRIPE_PUB_KEY_TEST!);

function App({ Component, pageProps }: AppProps) {
	const [loading, setLoading] = useState<boolean>(true);
	const [cookieState, setCookieState] = useState<boolean>(false);

	const consentPropertyName = 'jdc_consent';

	const shouldShowPopup = () => !CookieStorage.getValue(consentPropertyName);

	useEffect(() => {
		if (shouldShowPopup()) {
			setLoading(false);
			setTimeout(() => {
				setCookieState(false);
			}, 1000);
		} else {
			setLoading(false);
			setCookieState(true);
		}
	}, [cookieState]);

	return (
		<>
			<DefaultSeo />
			<Elements stripe={stripePromise}>
				<CookieConsent
					cookieState={cookieState}
					setCookieState={setCookieState}
					loading={loading}
				/>
				<Component {...pageProps} />
			</Elements>
		</>
	);
}

export default wrapper.withRedux(App);
