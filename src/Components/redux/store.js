import { configureStore } from "@reduxjs/toolkit";
import { myOwnReducer } from "./muCounter";
import productReducier from './getMyProduct'

export let stor = configureStore({
    reducer:{
        myOwnReducer,
        productReducier
    }
});

