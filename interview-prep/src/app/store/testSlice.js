import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    addItems: (state, action) => {
      return action.payload;
    },
    toggleValue: (state, action) => {
      const item = state.find((obj) => obj.id === action.payload);
      if (item) {
        item.value = !item.value;
      }
    },
  },
});

export const { toggleValue, addItems } = testSlice.actions;
export default testSlice.reducer;
