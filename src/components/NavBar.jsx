import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useCartStore from '../store/cartStore';

const NavBar = ({ theme, onToggleTheme }) => {
  const { user, handleLogout } = useAuth();
  const totalItems = useCartStore((s) => s.items.reduce((acc, item) => acc + item.quantity, 0));

  return (
    <header className="topbar">
      <nav className="topbar-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/products">Products</NavLink>
        <NavLink to="/cart">
          Cart{totalItems > 0 && <span className="cart-count">{totalItems}</span>}
        </NavLink>
      </nav>
      <div className="topbar-actions">
        <button onClick={onToggleTheme} className="toggle-theme">
          {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
        {user ? (
          <div className="user-area">
            <span className="username-label">{user.username}</span>
            <button onClick={handleLogout} className="btn-outline">Logout</button>
          </div>
        ) : (
          <NavLink to="/login" className="btn-outline">Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default NavBar;
