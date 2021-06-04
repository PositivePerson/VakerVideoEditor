import { useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { login, logout } from '~/utils/apiHelper';
import { Container } from '~/components/ui/Container';
import { SuccessMessage } from '~/components/ui/Form/SuccessMessage';
import { signIn } from '~/redux/user/user.actions';

export default function SingIn(props: any) {
    const router = useRouter();
    const { state, t: jsonWebToken } = router.query;

    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            if (state === 'success' && typeof jsonWebToken === 'string') {
                const loginResult = login(jsonWebToken);
                if (loginResult) {

                    dispatch(signIn(jsonWebToken));

                    setTimeout(() => {
                        router.push('/dashboard');
                    }, 1000);

                    return;
                }
            }

            await logout();
            router.push('/');
        })();
    }, []);

    return (
        <>
            <NextSeo title="Login Success" />
            <Container title="Redirecting">
                <SuccessMessage>
                    Your signin was successful. We are redirecting you
                </SuccessMessage>
            </Container>
        </>
    );
}

// export const getServersideProps: GetServerSideProps = async (context) => {
// 	const { success } = context.query;

// 	if (success) {
// 		await login(success);
// 		serverSideRedirect('/dashboard', context);
// 	}
// 	return {
// 		props: {
// 			state: success,
// 		},
// 	};
// };
