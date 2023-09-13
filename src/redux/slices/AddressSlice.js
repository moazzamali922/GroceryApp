const {createSlice} = require('@reduxjs/toolkit');

export const AddressSlice = createSlice({
  name: 'address', 
  initialState: { 
    data: [],
  },
  reducers: {
    addAddress(state, action) {
      state.data.push(action.payload);
    },
    deleteAddress(state, action) {
      let moazzam = state.data.filter(item => {
        return item.id !== action.payload;
      });
      state.data = moazzam;
    },
    updateAddress(state, action) {
      const updatedData = state.data.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            state: action.payload.state,
            city: action.payload.city,
            pincode: action.payload.pincode,
            selectedMethod: action.payload.selectedMethod,
          };
        }
        return item;
      });
    
      state.data = updatedData;
    },
    
  },
});

export const {addAddress, deleteAddress, updateAddress} = AddressSlice.actions;
export default AddressSlice.reducer;
