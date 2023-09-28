import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { FallingLines } from 'react-loader-spinner'; // Import the loader
import config from './config/config';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import './style/App.css';

function App() {
  const location = useLocation();


  return (
    <HelmetProvider>
      <Helmet>
        <title>
          {config.web.name} {location.pathname !== '/' ? location.pathname.replace('/', '/ ') : ''}
        </title>
        <meta name="description" content={config.web.description} />
        <meta name="theme-color" content={config.web.hex_color} />
        <meta name="url" content={config.web.url} />
        <meta name="image" content={config.web.image} />
        <link rel="shortcut icon" href={config.web.image} type="image/x-icon" />
        {/* Add more common metadata as needed */}
      </Helmet>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/about" exact element={<About />} />
              <Route path="/projects" exact element={<Projects />} />
              <Route path="/projects/:page?" element={<Projects />} />
              <Route path="*" element={<Navigate to="/" replace={true} />} />
            </Routes>
    </HelmetProvider>
  );
}

export default App;
