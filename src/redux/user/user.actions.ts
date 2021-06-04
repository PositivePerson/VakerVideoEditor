import { SIGNIN } from '~/redux/user/user.types';
import decodeJwtToken from '~/utils/jwtToken';

/**
 * Basic redux setup
 */
export const signIn = (jwtToken: string) => {
	return {
		type: SIGNIN,
		jwtToken,
		tokenData: decodeJwtToken(jwtToken),
		isLoggedIn: true,
	};
};
