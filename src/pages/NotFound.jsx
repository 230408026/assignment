import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="not-found-page">
    <h2>404 — Page Not Found</h2>
    <p>Sorry, this page does not exist.</p>
    <Link to="/" className="btn-primary">Back to Home</Link>
  </div>
);

export default NotFound;
