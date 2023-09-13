const {createSlice} = require('@reduxjs/toolkit');
export const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data: [],
  },
  reducers: {
    addProfile(state, action) {
      state.data.push(action.payload);
      // console.log(action.payload)
    },
    deleteProfile(state, action) {
      let myApp = state.data.filter(item => {
        return item.id !== action.payload;
      });
      state.data = myApp;
    },
    updateProfile(state, action) {
      const updatedData = state.data.map(item => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            name: action.payload.name,
            email: action.payload.email,
          };
        }
        return item;
      });
      state.data = updatedData;
    },
  },
});

export const {addProfile, deleteProfile, updateProfile} = ProfileSlice.actions;
export default ProfileSlice.reducer;
