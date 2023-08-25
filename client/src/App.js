import HomePage from './Components/HomePage';
import Login from './Components/Login';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomePage />} />
        
      </Routes>
    </BrowserRouter>
  );
}

