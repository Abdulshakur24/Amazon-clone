import { createSlice } from "@reduxjs/toolkit";

export const basketSlice = createSlice({
  name: "user",
  initialState: {
    basket: [],
  },
  reducers: {
    addBasket: (state, action) => {
      state.basket = [...state.basket, action.payload];
    },
    removeBasket: (state, action) => {
      state.basket.splice(action.payload, 1);
    },
    emptyBasket: (state) => {
      state.basket.length = 0;
    },
  },
});

export const { addBasket, removeBasket, emptyBasket } = basketSlice.actions;

export default basketSlice.reducer;
