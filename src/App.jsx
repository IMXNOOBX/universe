import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import './style/App.css';

function App() {
  return (
	<Routes>
		<Route path="/" exact element={<Home />} />
		<Route path="/about" exact element={<About />} />
		<Route path="/projects" exact element={<Projects />} />
		<Route path="/projects/:page?" element={<Projects />} />
		<Route path="*" element={<Navigate to="/" replace={true} />} />
	</Routes>
  );
}

export default App;
