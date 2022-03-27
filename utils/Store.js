import Cookies from "js-cookie";
import { createContext, useReducer } from "react";

export const Store = createContext();

const initialState = {
  darkMode: Cookies.get("darkMode") === "ON" ? true : false,
  cart: {
    cartItems: Cookies.get("cartItems") ? JSON.parse(Cookies.get("cartItems")): [],
  }
};

// Reducer explained: State: The State Object consists of multiple states. 
// Action: `type` and `payload`, type is the subject and payload is the content.

function reducer(state, action) {
  switch (action.type) {
    case "DARK_MODE_ON":
      return { ...state, darkMode: true };
    case "DARK_MODE_OFF":
      return { ...state, darkMode: false };
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find((item) => item._id === newItem._id) // an item or `null`
      const cartItems = existItem ? 
        state.cart.cartItems.map((item) => item.name === existItem.name ? newItem : item) 
        : 
        [...state.cart.cartItems, newItem]
      Cookies.set('cartItems', JSON.stringify(cartItems)); // quantity not included.
      return { ...state, cart: {...state.cart, cartItems}} // @BUG ? SHOULD I USE [] instead of {} ?
        


    default:
      return state;
  }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch };
    return (
        <Store.Provider value={value}>
            {props.children}
        </Store.Provider>
    
    )
}