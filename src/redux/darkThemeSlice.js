import { createSlice } from "@reduxjs/toolkit";

const initialState =
  localStorage.getItem("theme") === null
    ? {
        value: true,
      }
    : {
        value: localStorage.getItem("theme") === "true",
      };

export const darkThemeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state) => {
      state.value = !state.value;
    },
  },
});

export const { changeTheme } = darkThemeSlice.actions;

export default darkThemeSlice.reducer;
