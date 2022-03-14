import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Suspense } from 'react';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </>
  );
}

export default App;
