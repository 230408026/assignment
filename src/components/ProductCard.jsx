import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="card">
    <Link to={`/products/${product.id}`}>
      <img src={product.thumbnail} alt={product.title} className="card-img" />
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <span className="card-cat">{product.category}</span>
        <p className="card-price">${product.price.toFixed(2)}</p>
      </div>
    </Link>
  </div>
);

export default ProductCard;
