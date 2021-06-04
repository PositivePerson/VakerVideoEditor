import jscookie, { CookieAttributes } from 'js-cookie';
import { addHours } from 'date-fns';

const defaultExpireTime = addHours(new Date(), 24);

export default class CookieStorage {
    public static getValue(key: string): string | null {
        try {
            return jscookie.getJSON(key) ?? null;
        } catch {
            return null;
        }
    }

    public static setValue(
        cookieName: string,
        cookieData: any,
        expiration: number | Date = defaultExpireTime,
        path = '/',
        domain = location.hostname,
        secure?: boolean,
        sameSite?: CookieAttributes['sameSite'],
    ): boolean {
        try {
            jscookie.set(cookieName, JSON.stringify(cookieData), {
                expires: expiration,
                path,
                domain,
                secure,
                sameSite,
            });

            return true;
        } catch {
            return false;
        }
    }

    public static remove(cookieName: string): void {
        jscookie.remove(cookieName);
    }
}
