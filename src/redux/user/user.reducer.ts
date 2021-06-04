import { SIGNIN } from './user.types';

export interface IUserState {
    tokenData: object;
    jwtToken: string | null;
    isLoggedIn: boolean;
}

const initialState: IUserState = {
    tokenData: {},
    isLoggedIn: false,
    jwtToken: null,
};

const ACTION_HANDLERS: any = {
    [SIGNIN]: (state: any, { tokenData, jwtToken, isLoggedIn }: any) => ({
        ...state,
        tokenData,
        jwtToken,
        isLoggedIn,
    }),
};

export default function userReducer(state = initialState, action: any) {
    const handler = ACTION_HANDLERS[action.type];

    return handler ? handler(state, action) : state;
}
