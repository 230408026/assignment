import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { getAllProducts } from '../api/productsApi';
import ProductCard from '../components/ProductCard';

const ProductList = () => {
  const [params, setParams] = useSearchParams();
  const searchText = params.get('q') || '';
  const selectedCategory = params.get('category') || '';

  const { data: products, loading, error } = useFetch(
    (signal) => getAllProducts(signal),
    []
  );

  const categoryList = useMemo(() => {
    if (!products) return [];
    const unique = [...new Set(products.map((p) => p.category))];
    return unique.sort();
  }, [products]);

  const visibleProducts = useMemo(() => {
    if (!products) return [];
    let result = products;
    if (searchText) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }
    return result;
  }, [products, searchText, selectedCategory]);

  const handleParamChange = (key, val) => {
    setParams((prev) => {
      const updated = new URLSearchParams(prev);
      if (val) updated.set(key, val);
      else updated.delete(key);
      return updated;
    });
  };

  if (loading) return <p className="message">Loading products...</p>;
  if (error) return <p className="message err">{error}</p>;

  return (
    <div>
      <h2>All Products</h2>
      <div className="filter-bar">
        <input
          type="text"
          value={searchText}
          onChange={(e) => handleParamChange('q', e.target.value)}
          placeholder="Search products..."
        />
        <select
          value={selectedCategory}
          onChange={(e) => handleParamChange('category', e.target.value)}
        >
          <option value="">All categories</option>
          {categoryList.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {visibleProducts.length === 0 ? (
        <p className="message">No products found.</p>
      ) : (
        <div className="products-grid">
          {visibleProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
