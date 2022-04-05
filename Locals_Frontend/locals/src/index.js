import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './components/Register'
import SellerHome from './components/SellerHome'

import {BrowserRouter, Routes, Route} from 'react-router-dom';
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
  integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
  crossorigin="anonymous"
/>

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

