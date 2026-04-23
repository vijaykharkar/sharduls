import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

/* ─────────────── INITIAL STATE ─────────────── */
const initialState = {
  /* auth */
  user: null,
  token: null,
  isAuthenticated: false,
  authLoading: true,
  authModalOpen: false,
  authModalTab: 'login', // 'login' | 'register'

  /* cart */
  cartItems: [],

  /* wishlist */
  wishlistItems: [],

  /* addresses */
  addresses: [],
  selectedAddressId: null,

  /* toast */
  toasts: [],

  /* UI */
  searchQuery: '',
};

/* ─────────────── ACTION TYPES ─────────────── */
const A = {
  /* auth */
  AUTH_LOADING:       'AUTH_LOADING',
  LOGIN_SUCCESS:      'LOGIN_SUCCESS',
  LOGOUT:             'LOGOUT',
  SET_USER:           'SET_USER',
  OPEN_AUTH_MODAL:    'OPEN_AUTH_MODAL',
  CLOSE_AUTH_MODAL:   'CLOSE_AUTH_MODAL',

  /* cart */
  SET_CART:           'SET_CART',
  ADD_TO_CART:        'ADD_TO_CART',
  REMOVE_FROM_CART:   'REMOVE_FROM_CART',
  UPDATE_CART_QTY:    'UPDATE_CART_QTY',
  CLEAR_CART:         'CLEAR_CART',

  /* wishlist */
  SET_WISHLIST:       'SET_WISHLIST',
  TOGGLE_WISHLIST:    'TOGGLE_WISHLIST',

  /* addresses */
  SET_ADDRESSES:      'SET_ADDRESSES',
  ADD_ADDRESS:        'ADD_ADDRESS',
  UPDATE_ADDRESS:     'UPDATE_ADDRESS',
  REMOVE_ADDRESS:     'REMOVE_ADDRESS',
  SELECT_ADDRESS:     'SELECT_ADDRESS',

  /* toast */
  ADD_TOAST:          'ADD_TOAST',
  REMOVE_TOAST:       'REMOVE_TOAST',

  /* UI */
  SET_SEARCH:         'SET_SEARCH',
};

/* ─────────────── REDUCER ─────────────── */
function appReducer(state, action) {
  switch (action.type) {
    /* ── Auth ── */
    case A.AUTH_LOADING:
      return { ...state, authLoading: action.payload };
    case A.LOGIN_SUCCESS:
      return { ...state, user: action.payload.user, token: action.payload.token, isAuthenticated: true, authLoading: false, authModalOpen: false };
    case A.LOGOUT:
      return { ...state, user: null, token: null, isAuthenticated: false, cartItems: [], wishlistItems: [], addresses: [], selectedAddressId: null };
    case A.SET_USER:
      return { ...state, user: action.payload };
    case A.OPEN_AUTH_MODAL:
      return { ...state, authModalOpen: true, authModalTab: action.payload || 'login' };
    case A.CLOSE_AUTH_MODAL:
      return { ...state, authModalOpen: false };

    /* ── Cart ── */
    case A.SET_CART:
      return { ...state, cartItems: action.payload };
    case A.ADD_TO_CART: {
      const exists = state.cartItems.find((i) => i.id === action.payload.id);
      if (exists) {
        return { ...state, cartItems: state.cartItems.map((i) => i.id === action.payload.id ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, qty: 1 }] };
    }
    case A.REMOVE_FROM_CART:
      return { ...state, cartItems: state.cartItems.filter((i) => i.id !== action.payload) };
    case A.UPDATE_CART_QTY:
      return { ...state, cartItems: state.cartItems.map((i) => i.id === action.payload.id ? { ...i, qty: Math.max(1, action.payload.qty) } : i) };
    case A.CLEAR_CART:
      return { ...state, cartItems: [] };

    /* ── Wishlist ── */
    case A.SET_WISHLIST:
      return { ...state, wishlistItems: action.payload };
    case A.TOGGLE_WISHLIST: {
      const inList = state.wishlistItems.find((i) => i.id === action.payload.id);
      if (inList) return { ...state, wishlistItems: state.wishlistItems.filter((i) => i.id !== action.payload.id) };
      return { ...state, wishlistItems: [...state.wishlistItems, action.payload] };
    }

    /* ── Addresses ── */
    case A.SET_ADDRESSES:
      return { ...state, addresses: action.payload };
    case A.ADD_ADDRESS:
      return { ...state, addresses: [...state.addresses, action.payload] };
    case A.UPDATE_ADDRESS:
      return { ...state, addresses: state.addresses.map((a) => a.id === action.payload.id ? action.payload : a) };
    case A.REMOVE_ADDRESS:
      return { ...state, addresses: state.addresses.filter((a) => a.id !== action.payload), selectedAddressId: state.selectedAddressId === action.payload ? null : state.selectedAddressId };
    case A.SELECT_ADDRESS:
      return { ...state, selectedAddressId: action.payload };

    /* ── Toast ── */
    case A.ADD_TOAST:
      return { ...state, toasts: [...state.toasts, action.payload] };
    case A.REMOVE_TOAST:
      return { ...state, toasts: state.toasts.filter((t) => t.id !== action.payload) };

    /* ── UI ── */
    case A.SET_SEARCH:
      return { ...state, searchQuery: action.payload };

    default:
      return state;
  }
}

/* ─────────────── CONTEXT ─────────────── */
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  /* ── Hydrate from localStorage on mount ── */
  useEffect(() => {
    const token = localStorage.getItem('buyer_access_token');
    const userJson = localStorage.getItem('buyer_user');
    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        dispatch({ type: A.LOGIN_SUCCESS, payload: { user, token } });
      } catch { /* corrupt data */ }
    }
    dispatch({ type: A.AUTH_LOADING, payload: false });

    const cart = localStorage.getItem('buyer_cart');
    if (cart) { try { dispatch({ type: A.SET_CART, payload: JSON.parse(cart) }); } catch {} }
    const wl = localStorage.getItem('buyer_wishlist');
    if (wl) { try { dispatch({ type: A.SET_WISHLIST, payload: JSON.parse(wl) }); } catch {} }
    const addrs = localStorage.getItem('buyer_addresses');
    if (addrs) { try { dispatch({ type: A.SET_ADDRESSES, payload: JSON.parse(addrs) }); } catch {} }
  }, []);

  /* ── Persist cart / wishlist / addresses ── */
  useEffect(() => { localStorage.setItem('buyer_cart', JSON.stringify(state.cartItems)); }, [state.cartItems]);
  useEffect(() => { localStorage.setItem('buyer_wishlist', JSON.stringify(state.wishlistItems)); }, [state.wishlistItems]);
  useEffect(() => { localStorage.setItem('buyer_addresses', JSON.stringify(state.addresses)); }, [state.addresses]);

  /* ── Toast helper ── */
  const addToast = useCallback((message, type = 'info') => {
    const id = Date.now() + Math.random();
    dispatch({ type: A.ADD_TOAST, payload: { id, message, type } });
    setTimeout(() => dispatch({ type: A.REMOVE_TOAST, payload: id }), 4000);
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch, A, addToast }}>
      {children}
    </AppContext.Provider>
  );
}

/* ── Base hook ── */
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppContext must be used within AppProvider');
  return ctx;
}

export { A };
export default AppContext;
