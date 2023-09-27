import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { AnimatePresence, motion } from "framer-motion";
import config from './config/config'
import Home from './pages/Home';
import Projects from './pages/Projects';
import './style/App.css';

function App() {
	const location = useLocation();

	console.log(location)

	return (
		<HelmetProvider>
			<Helmet>
				<title>{config.web.name} {location.pathname !== "/" ? location.pathname.replace('/', '/ ') : ""}</title>
				<meta name="description" content={config.web.description} />
				<meta name="theme-color" content={config.web.hex_color} />
				<meta name="url" content={config.web.url} />
				<meta name="image" content={config.web.image} />
				<link rel="shortcut icon" href={config.web.image} type="image/x-icon" />
				{/* Add more common metadata as needed */}
			</Helmet>
			<AnimatePresence>
				<motion.div
					key={location.pathname}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<Routes>
						<Route path="/" exact element={<Home />} />
						<Route path="/projects" exact element={<Projects />} />
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</motion.div>
			</AnimatePresence>
		</HelmetProvider>
	);
}

export default App;
