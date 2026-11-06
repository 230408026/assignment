import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

const Cart = () => {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const clear = useCartStore((s) => s.clear);

  const totalPrice = items.reduce((sum, x) => sum + x.price * x.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Cart</h2>
        <p>Nothing in your cart yet.</p>
        <Link to="/products" className="btn-primary">Go Shopping</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Cart</h2>
      <ul className="cart-list">
        {items.map((item) => (
          <li key={item.id} className="cart-row">
            <div>
              <strong>{item.title}</strong>
              <span className="item-price">${item.price.toFixed(2)}</span>
            </div>
            <div className="qty-controls">
              <button onClick={() => setQuantity(item.id, item.quantity - 1)}>-</button>
              <span className="qty-value">{item.quantity}</span>
              <button onClick={() => setQuantity(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => removeItem(item.id)} className="btn-remove">
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p className="total">Total: ${totalPrice.toFixed(2)}</p>
        <button onClick={clear} className="btn-danger">Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
