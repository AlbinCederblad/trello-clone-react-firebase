import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";

export default function configureStore(persistedState) {
    const store = createStore(
        rootReducer,
        persistedState,
        composeWithDevTools(applyMiddleware(thunkMiddleware))
    );
    store.dispatch(verifyAuth());
    return store;
}