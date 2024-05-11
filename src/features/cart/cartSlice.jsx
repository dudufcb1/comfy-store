import { createSlice } from '@reduxjs/toolkit';
import { json } from 'react-router-dom';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      console.log(state);
      //#region ActionYPayload0408
      /* El action lo necesitamos para "ver" que nos están mandando desde la invocación, en este caso el objeto producto que nos trae dentro "cartProduct". */
      //#endregion
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      //#region Objeto Temporal 0635
      /* En este caso todas las operaciones aquí básicamente están en "memoria" no están yendo a ningún lado todavía, solo cuando se escriben al estado tendríamos acceder como state.propiedad etc... */
      //#endregion
      if (item) {
        item.amount += product.amount;
      } else {
        state.cartItems.push(product);
      }
      state.numItemsInCart += product.amount;
      //Se agrega al total no importando que producto es, ya que simplemente está diciendo que hay un producto más y no le importa cual es.
      //#region Operaciones en cada "click" 1112
      /* En estas operaciones se van agregando propiedades al estado de nuestro carrito, se hacen en cada clic, pues básicamente solo vamos añadiendo las propiedades que se nos son enviadas. */
      //#endregion

      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);

      toast.success('Added to cart');
    },
    clearCart: (state) => {
      localStorage.setItem('cart', JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Item deleted from the cart');
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload; //Esto nos manda un único producto sacamos su ID y su cantidad, o sea la cantidad elegida al momento de agregarlo al carrito.
      const item = state.cartItems.find((i) => i.cartID === cartID); //Encontramos el producto en el carrito.
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.error('Cart Updated');
    },
    calculateTotals: (state) => {
      //#region Función Reutilizable 5132
      /* En este caso se pudo utilizar como función reutilizable por que todo lo que necesita está en el estado, entonces, no se comparten claves o valores "temporales, todo viene del estado" */
      //#endregion
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;
export default cartSlice.reducer;
