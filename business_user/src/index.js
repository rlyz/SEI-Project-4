import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import GenericError from './screens/Error/ErrorBoundary/GenericError'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store'

ReactDOM.render(
  <React.StrictMode>
    <GenericError>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </GenericError>
  </React.StrictMode>,
  document.getElementById('root')
);

