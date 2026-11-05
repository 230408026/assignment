import { create } from 'zustand';

const readCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('shopping-cart');
    if (!saved) return [];
    const data = JSON.parse(saved);
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const useCartStore = create((set) => ({
  items: readCartFromStorage(),

  addItem: (product) => set((state) => {
    const found = state.items.find((x) => x.id === product.id);
    if (found) {
      return { items: state.items.map((x) => x.id === product.id ? { ...x, quantity: x.quantity + 1 } : x) };
    }
    return { items: [...state.items, { id: product.id, title: product.title, price: product.price, quantity: 1 }] };
  }),

  removeItem: (id) => set((state) => ({
    items: state.items.filter((x) => x.id !== id)
  })),

  setQuantity: (id, qty) => set((state) => {
    if (qty < 1) return { items: state.items.filter((x) => x.id !== id) };
    return { items: state.items.map((x) => x.id === id ? { ...x, quantity: qty } : x) };
  }),

  clear: () => set({ items: [] })
}));

useCartStore.subscribe((state) => {
  try {
    localStorage.setItem('shopping-cart', JSON.stringify(state.items));
  } catch {
    // storage might be full
  }
});

export default useCartStore;
