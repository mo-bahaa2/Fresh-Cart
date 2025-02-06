import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export let WishContext = createContext();

export default function WishListContext({ children }) {
  const [wishlist, setWishlist] = useState([]); // Store wishlist items
  const headers={
    token:localStorage.getItem('userToken')
}
  async function addWishList(productId) {
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId },
        {
          headers,
        }
      );

      console.log(data.data);
      toast(data.message, { icon: '❤️' });

      // Update wishlist state
      setWishlist((prev) => [...prev, productId]);

    } catch (e) {
      console.log(e);
    }
  }



  async function deleteWishList(proId, refetch) {
    try {
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${proId}`,
        {
          headers,
        }
      );
  
      toast.success(data.message);
  
      // Update wishlist state
      setWishlist((prev) => prev.filter((id) => id !== proId));
  
      // Refetch the wishlist data
      if (refetch) {
        refetch();
      }
  
    } catch (e) {
      console.log(e);
    }
  }

  

  return <WishContext.Provider value={{ addWishList, wishlist,deleteWishList }}>
      {children}
    </WishContext.Provider>
}
