import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import '../node_modules/primeflex/primeflex.css';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store/store'; // Adjust the path according to your folder structure
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
