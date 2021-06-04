import { applyMiddleware, CombinedState, combineReducers, createStore, Reducer } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import user, { IUserState } from '~/redux/user/user.reducer';
import editor, { IEditorState } from '~/redux/editor/editor.reducer';

export type RootState = CombinedState<{ user: IUserState, editor: IEditorState }>;

const combinedReducer: Reducer<RootState, any> = combineReducers({
    user,
    editor,
});

const bindMiddleware = (middleware: any) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension');
        return composeWithDevTools(applyMiddleware(...middleware));
    }
};

const reducer = (state: any, action: any) => {
    if (action.type === HYDRATE) {
        return { ...state, ...action.payload };
    } else {
        return combinedReducer(state, action);
    }
};

const initStore = () => {
    return createStore(reducer, bindMiddleware([thunkMiddleware]));
};

export const wrapper = createWrapper(initStore);
