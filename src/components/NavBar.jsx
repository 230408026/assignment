import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <header className="topbar">
      <nav className="topbar-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">Cart</NavLink>
      </nav>
      <div className="topbar-actions">
        <NavLink to="/login" className="btn-outline">Login</NavLink>
      </div>
    </header>
  );
};

export default NavBar;
