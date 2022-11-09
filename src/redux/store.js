import { configureStore } from '@reduxjs/toolkit'
import darkThemeReducer from './darkThemeSlice'
import loadingReducer from './loadingSlice'

export const store = configureStore({
    reducer: {
        darkTheme: darkThemeReducer,
        loading: loadingReducer,
    },
})