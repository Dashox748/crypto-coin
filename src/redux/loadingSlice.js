import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    changeLoadingStateToTrue: (state) => {
      state.value = true;
    },
    changeLoadingStateToFalse: (state) => {
      state.value = false;
    },
  },
});

export const { changeLoadingStateToFalse, changeLoadingStateToTrue } =
  loadingSlice.actions;

export default loadingSlice.reducer;
