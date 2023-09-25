import { Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Projects from './pages/Projects';
import './style/App.css';

function App() {
  return (
    <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/projects" exact element={<Projects/>} />
          <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
