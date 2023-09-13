const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map(item => {
        if (item.id == action.payload.id) {
          isItemExist = true;
          item.qty = item.qty + 1;
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }
      state.data = tempData;
    },

    removeItemFromCart(state, action) {
      const tempData = state.data.findIndex(
        item => item.id === action.payload.id,
      );
      if (tempData !== -1) {
        const item = state.data[tempData];
        if (item.qty > 1) {
          item.qty -= 1;
        } else {
          state.data.splice(tempData, 1);
        }
      }
    },
  },
});

export const {addItemToCart, removeItemFromCart} = CartSlice.actions;
export default CartSlice.reducer;

// const {createSlice} = require('@reduxjs/toolkit');

// const CartSlice = createSlice({
//   name: 'cart',
//   initialState: {
//     data: [],
//   },
//   reducers: {
//     addItemToCart(state, action) {
//       const newItem = action.payload;
//       // Check if the item is already in the cart
//       if (!state.data.some(item => item.id === newItem.id)) {
//         state.data.push(newItem);
//       }
//     },
//   },
// });

// export const {addItemToCart} = CartSlice.actions;
// export default CartSlice.reducer;
