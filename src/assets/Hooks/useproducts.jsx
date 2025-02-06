import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function useproducts() {
    function getProduct(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      }
    
      let response=useQuery( {
        //name of request 
        queryKey: ['recentProduct'],
        queryFn: getProduct,
        gcTime:5000000,
        // staleTime:300000,
        // refetchInterval:3000,
        // refetchOnMount:false,
        // refetchOnWindowFocus:false,
        select:(data)=>data.data.data 
      })
    
      return response
}
