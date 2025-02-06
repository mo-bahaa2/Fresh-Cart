import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

let initialState={isLodaing:false, prod:[],error:null}

export let myProductMo=createAsyncThunk('myProduct/myProductMo',async()=>{
    let {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
    return data.data
})

let myProduct =createSlice({

    name:'myProduct',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(myProductMo.pending,(state,action)=>{
            state.isLoading=true
        })
        builder.addCase(myProductMo.fulfilled,(state,action)=>{
            state.isLoading=false
            state.prod=action.payload
        })
        builder.addCase(myProductMo.rejected,(state,action)=>{
            state.isLoading=false
            state.error=action.error
        })
    }
})

export default myProduct.reducer