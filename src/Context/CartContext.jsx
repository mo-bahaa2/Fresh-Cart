import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";


export let CartContext=createContext();

export default function CartContextProvider({children}){
    const [card, setCard] = useState(null)
    
    const headers={
        token:localStorage.getItem('userToken')
    }
    // addd product 
    async function addCardPtoduct(productId){
        try{
            let{data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
                productId
            },{
                headers
            })
            console.log(data);
            // setCard(data)
            getCardPtoduct(data)
            
            toast.success(data.message)

        }catch(e)
        {
            console.log(e)
        }
    }

    // update product
    async function updateCardPtoduct(productId,count){
        try{
            let{data}=await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                count
            },{
                headers
            })
            console.log(data);
            getCardPtoduct(data)
            
            toast.success(data.status)

        }catch(e)
        {
            console.log(e)
        }
    }

        // get card details 
    async function getCardPtoduct(){
        try{
            let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
                headers
            })
            console.log(data);
            setCard(data)
            
        }catch(e)
        {
            console.log(e)
        }
    }

    // remove item of product 
    async function removeCardPtoduct(productId){
        try{
            let{data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
                headers
            })
            console.log(data);
            setCard(data)
            toast.success(data.status)

        }catch(e)
        {
            console.log(e)
        }
    }

    async function clearCart() {
        try {
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
            setCard(null);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(()=>{
        getCardPtoduct()  // load card data on app launch
    },[])


    return <CartContext.Provider value={ {addCardPtoduct ,card , updateCardPtoduct,removeCardPtoduct ,clearCart} }>
        {children}
    </CartContext.Provider>
}