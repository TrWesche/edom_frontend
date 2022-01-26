// React Base Library Imports
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

// Styling Imports
import { CssBaseline } from "@mui/material"

// Application Import
import App from './components/app';

// Redux Imports
import { Provider } from "react-redux";
import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux Reducer Imports
import reducerGlobal from './redux/reducerGlobal';

// -- FOR DEV ONLY, should be bypassed for Production / Testing

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const globalStore = createStore(
  reducerGlobal,
  compose(
    applyMiddleware(thunk),
    composeEnhancers()
  )
);

// export type RootState = ReturnType<typeof globalStore.getState>;
// export type AppDispatch = typeof globalStore.dispatch;

ReactDOM.render(
  <React.StrictMode>
    <Provider store={globalStore}>
      <CssBaseline />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();