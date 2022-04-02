import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './components/Register'
import SellerHome from './components/SellerHome'

import {BrowserRouter, Routes, Route} from 'react-router-dom';


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

