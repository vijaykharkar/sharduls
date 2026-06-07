export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.qty, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
export const selectCartMrpTotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + (i.mrp || i.price) * i.qty, 0);
