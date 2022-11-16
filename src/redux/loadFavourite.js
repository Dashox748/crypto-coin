import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loadFavourite = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    loadFavouriteFromDatabse: (state) => {
      state.value = !state.value;
    },
  },
});

export const { loadFavouriteFromDatabse } = loadFavourite.actions;

export default loadFavourite.reducer;
