import { useReducer, useEffect } from 'react';

const initialState = { data: null, loading: true, error: null };

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { data: null, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { data: action.payload, loading: false, error: null };
    case 'FETCH_ERROR':
      return { data: null, loading: false, error: action.payload };
    default:
      return state;
  }
};

const useFetch = (fetchFunction, dependencies = []) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const abortController = new AbortController();

    dispatch({ type: 'FETCH_START' });

    fetchFunction(abortController.signal)
      .then((result) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: result });
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          dispatch({ type: 'FETCH_ERROR', payload: err.message });
        }
      });

    return () => abortController.abort();
  }, dependencies);

  return state;
};

export default useFetch;
