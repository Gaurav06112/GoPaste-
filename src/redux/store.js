import {configureStore} from "@reduxjs/toolkit"
import pasteReducer from "../features/pasteSlice.jsx";

export const store=configureStore({
    reducer:{
        paste:pasteReducer,
    },
});


