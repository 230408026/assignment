import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getProductById } from '../api/productsApi';
import useCartStore from '../store/cartStore';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);

  const { data: product, loading, error } = useFetch(
    (signal) => getProductById(id, signal),
    [id]
  );

  if (loading) return <p className="message">Loading product...</p>;
  if (error) return <p className="message err">{error}</p>;

  return (
    <div className="detail-page">
      <button onClick={() => navigate('/products')} className="go-back">
        &larr; Back to list
      </button>
      <div className="detail-layout">
        <img src={product.thumbnail} alt={product.title} className="detail-img" />
        <div className="detail-text">
          <h2>{product.title}</h2>
          <span className="tag">{product.category}</span>
          <p>{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <button className="btn-primary" onClick={() => addItem(product)}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
