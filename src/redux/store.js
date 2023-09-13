const {configureStore} = require('@reduxjs/toolkit');

import ProductReduer from './slices/ProductsSlice';
import WishlistReducer from './slices/WishlistSlice';
import CartReducer from './slices/CartSlice';
import AddressReducer from './slices/AddressSlice';
import ProfileReducer from './slices/ProfileSlice';

export const store = configureStore({
  reducer: {
    product: ProductReduer,
    wishlist: WishlistReducer,
    cartlist: CartReducer,
    address: AddressReducer,
    profile: ProfileReducer,
  },
});
