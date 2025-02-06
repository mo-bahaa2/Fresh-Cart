import { createSlice } from "@reduxjs/toolkit";


let myCounter =createSlice({
    name:'myCounter',
    initialState:{myCount:0, CleintName:'mohamed'},
    reducers:{
        inceres:(state,action)=>{
            // console.log('increase');
            state.myCount+=1

            
        },
        decrease:(state,action)=>{
            // console.log('decrease');
            state.myCount-=1;
            
        },
        inceresAmont:(state,action)=>{
            // console.log('increase');
            state.myCount+=action.payload

            
        },

    }
})

export let myOwnReducer =myCounter.reducer
export let {inceres,decrease,inceresAmont}=myCounter.actions