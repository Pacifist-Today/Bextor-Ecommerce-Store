/**
 * @description The AppWrapper component.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { App } from './App'
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { cart } from "./components/Stores/ReduxStore";

export function AppWrapper(props) {
  return (
    <Provider store={cart}>
      <BrowserRouter>
        <CssBaseline />
        <App />
      </BrowserRouter>
    </Provider>
  );
}

AppWrapper.propTypes = {};

AppWrapper.defaultProps = {};
