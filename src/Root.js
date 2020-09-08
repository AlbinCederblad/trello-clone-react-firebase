import CssBaseline from "@material-ui/core/CssBaseline";
import React from "react";
import { Provider } from "react-redux";

import App from "./App";
import configureStore from "./configureStore";

const store = configureStore();

function Root() {
    return (
        <Provider store={store}>
            <CssBaseline />

            <App />

        </Provider>
    );
}

export default Root;