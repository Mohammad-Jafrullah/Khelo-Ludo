import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalState from './components/GlobalState';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GlobalState>
    <App />
  </GlobalState>
);
reportWebVitals();
