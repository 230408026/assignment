import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import './App.css';

const App = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="products" element={<ProductList />} />
      <Route path="products/:id" element={<ProductDetail />} />
    </Route>
  </Routes>
);

export default App;
