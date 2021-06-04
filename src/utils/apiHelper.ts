import { addHours } from 'date-fns';
import CookieStorage from '~/utils/CookieStorage';

const TOKEN_COOKIE_EXPIRE_HOURS = 10;
const TOKEN_COOKIE_NAME = 'refreshToken';

export function login(token: string): boolean {

    if (!token) {
        return false;
    }

    return CookieStorage.setValue(
        TOKEN_COOKIE_NAME,
        token,
        addHours(new Date(), TOKEN_COOKIE_EXPIRE_HOURS)
    );
}

export async function logout() {
    CookieStorage.remove(TOKEN_COOKIE_NAME);
}
