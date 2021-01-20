import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import configureStore from './redux/configureStore';


import {Provider} from 'react-redux';
const store = configureStore();


ReactDOM.render(
  <React.StrictMode>
    {/* THE MAKES DATA AVAILABLE TO ALL YOUR COMPONENTS */}
    <Provider store={store}>
      <App store={store}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
