import { Routes, Route } from 'react-router-dom';
import './App.css';

const Home = () => <h1>Home</h1>;

const App = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default App;
