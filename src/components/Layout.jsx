import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = ({ theme, onToggleTheme }) => {
  return (
    <div className={`wrapper ${theme}`}>
      <NavBar theme={theme} onToggleTheme={onToggleTheme} />
      <div className="content">
        <Outlet />
      </div>
      <footer className="site-footer">
        <span>Taylan — CMP309 Assignment 7</span>
      </footer>
    </div>
  );
};

export default Layout;
