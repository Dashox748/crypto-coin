import { configureStore } from "@reduxjs/toolkit";
import darkThemeReducer from "./darkThemeSlice";
import loadingReducer from "./loadingSlice";
import loadFavouriteReducer from "./loadFavourite";

export const store = configureStore({
  reducer: {
    darkTheme: darkThemeReducer,
    loading: loadingReducer,
    loadFavourite: loadFavouriteReducer,
  },
});
