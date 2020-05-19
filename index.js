import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
const cors = require('cors')



// <React.StrictMode>



ReactDOM.render(
 <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);



serviceWorker.unregister();
