# React Shop — Assignment 7

**Taylan** — 230408026

Online shop project for CMP309 Web Programming. Built with React + Vite, react-router-dom for page navigation, Context API for user login, and Zustand for the shopping cart.

## Getting Started

```
npm install
npm run dev
```

Login:
- Username: `230408026@st.biruni.edu.tr`
- Password: `demo123456`

---

## Reasoning Answers

### 1. Where does each piece of state live, and why?

The **signed-in user** is stored in a Context created with useReducer. I chose Context because the auth state barely ever changes and only a few components (the navbar and the route guard) need to know about it. The **shopping cart** lives in a Zustand store. Cart items change often when the user is browsing, and Zustand allows each component to subscribe to just the part it cares about, which avoids unnecessary renders. **Filter values** are kept in the URL query string using useSearchParams — this makes it possible to share a filtered link or refresh without losing the filters. The **product list** is local to the ProductList component through the useFetch hook since no other component needs the full list. The **theme preference** is saved to localStorage via the useLocalStorage hook so it persists across sessions, and it gets passed down as a prop because only a couple of components use it.

### 2. Why is auth in Context and cart in Zustand?

Auth state only updates twice in a typical session (once for login and once for logout), so it is not a problem that Context triggers a re-render of every consumer. The cart, on the other hand, updates every time the user adds, removes, or changes the quantity of an item. If the cart were in Context, the navbar badge, the cart page, and any future component that reads the cart would all re-render together even if only one value changed. Zustand solves this with selectors — a component that only reads the item count will not re-render when the total price changes. Putting auth in Zustand would technically work but there is no benefit since the re-render cost of two dispatches per session is negligible.

### 3. What does useFetch share and not share?

useFetch shares the repetitive pattern of dispatching FETCH_START, waiting for a promise, dispatching FETCH_SUCCESS or FETCH_ERROR, and aborting the request on cleanup. Both ProductList and ProductDetail use this same structure. What useFetch does NOT share is the actual fetched data: each component that calls the hook gets its own useReducer state. If two components both call useFetch, they each hold independent data — the hook shares logic, not state.

### 4. What type is the route parameter id?

useParams always gives back strings, so the id is a string even though the API uses numeric IDs. In practice this is fine when building the URL for the fetch call because template literals convert it automatically. But if you wanted to compare it with the numeric id field on a product object, you would need to convert it first (parseInt or Number), otherwise `===` would fail because `"5" !== 5`.

### 5. Why is ProtectedRoute not real security?

Everything runs in the browser, so a determined user can just modify React state from DevTools or hit the API endpoints directly. ProtectedRoute is only there to improve the user experience by redirecting unauthenticated visitors to the login page. Real security requires the server to validate a token (like a JWT) on every API call, so that even if someone bypasses the client-side check they still cannot access protected resources.

### 6. What happens if you refresh /products/3 on a static server?

The server would try to find a file called /products/3 on disk, fail, and return 404. React Router never gets a chance to run because the browser never receives the index.html. Vite's dev server has a fallback rule that serves index.html for any path that does not match a static file, which is why it works during development. To make it work in production you would configure your hosting provider to redirect all paths to index.html (for example with a `_redirects` file on Netlify or a `try_files` directive in nginx).
