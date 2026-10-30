const API_URL = 'https://dummyjson.com';

export const getAllProducts = async (signal) => {
  const response = await fetch(`${API_URL}/products?limit=100`, { signal });
  if (!response.ok) {
    throw new Error(`Products request failed: ${response.status}`);
  }
  const json = await response.json();
  return json.products;
};

export const getProductById = async (id, signal) => {
  const response = await fetch(`${API_URL}/products/${id}`, { signal });
  if (!response.ok) {
    throw new Error(
      response.status === 404 ? 'Product not found' : `Request failed: ${response.status}`
    );
  }
  return response.json();
};
