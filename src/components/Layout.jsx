import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';

const Layout = () => {
  return (
    <div className="wrapper">
      <NavBar />
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
