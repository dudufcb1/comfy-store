import { configureStore } from '@reduxjs/toolkit'; //import necesario.
import cartReducer from './features/cart/cartSlice'; // Se importa el reducer
import userReducer from './features/user/userSlice'; // Se importa el reducer

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer, //Estado renombrado o sea que se accederá a el como store.cartState
  },
});
