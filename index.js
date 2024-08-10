import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your App component
import './App.css'; // Import your CSS file

// Render the App component into the root div
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);