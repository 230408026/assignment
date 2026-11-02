import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home">
    <h1>Welcome</h1>
    <p>A simple online shop built with React for CMP309.</p>
    <Link to="/products" className="btn-primary">View Products</Link>
  </div>
);

export default Home;
