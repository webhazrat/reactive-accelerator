export const initailState = {
  cart: [],
};

export default function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cart: [...state.cart, action.payload],
      };
    case "REMOVE_FROM_CART":
      return {
        cart: state.cart.filter((item) => item.id !== action.payload.id),
      };
    default:
      return state;
  }
}
