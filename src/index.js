// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import App from './App';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <Provider store={store}>
//     <App />
//   // </Provider>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from "./redux/store";
import {CssBaseline} from "@mui/material";
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <CssBaseline />
            <App />
        </BrowserRouter>
    </Provider>
);