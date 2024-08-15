import { configureStore } from "@reduxjs/toolkit";
import playerReducer from '../redux/features/playerSlice.js'
import { apiCore } from "./services/apiCore.js";


const store = configureStore({
    reducer: {
        [apiCore.reducerPath]: apiCore.reducer,
        player: playerReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiCore.middleware),
})

export default store

