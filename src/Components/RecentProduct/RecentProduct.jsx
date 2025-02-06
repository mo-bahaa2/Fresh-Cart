import React, { useContext, useState } from 'react';
import style from './RecentProduct.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Context/CartContext';
import { useQuery } from '@tanstack/react-query';
import { WishContext } from '../../Context/WishListContext';

export default function Products() {
  let { addCardPtoduct } = useContext(CartContext);
  let { addWishList, wishlist } = useContext(WishContext); // Get wishlist
const [searchTerm, setSearchTerm] = useState("");
  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { data, isLoading } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProduct,
    select: (data) => data.data.data,
  });

  const filteredProducts = data?.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return <>

    <div className="flex justify-center mt-12 mb-5 w-full px-4">
      <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3">
        <input
          type="text"
          placeholder="Search products..."
          className="p-3 pl-12 border border-gray-300 rounded-full w-full shadow-md focus:ring-2 focus:ring-green-500 focus:border-green-500 text-gray-800 placeholder-gray-400 transition-all duration-300 ease-in-out hover:shadow-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <i className="fa-solid fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-green-500 text-lg"></i>
      </div>
    </div>

    {isLoading ? <Spinner /> : 
            <div className="flex flex-wrap py-8 gap-y-4 justify-center">
              {filteredProducts?.length > 0 ?
                filteredProducts.map((product) => {
                  // Check if the product is in the wishlist
                  const isInWishlist = wishlist.includes(product.id);
    
                  return<div key={product.id} className="w-6/12 md:w-4/12 lg:w-2/12">
                      <div className="product rounded-lg p-2">
                        <Link to={`productdetail/${product.id}`}>
                          <img src={product.imageCover} className="w-full" alt={product.title} />
                          <h3 className="text-main">{product.category.name}</h3>
                          <h3 className="text-xl">{product.title.split(" ", 2).join(" ")}</h3>
                          <div className="flex justify-between">
                            <span>{product.price} EGP</span>
                            <span>
                              <i className="fa-solid fa-star rating-color"></i>
                              {product.ratingsAverage}
                            </span>
                          </div>
                        </Link>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => addCardPtoduct(product.id)} className="btn flex-1">
                            Add to cart
                          </button>
                          <i
                            onClick={() => addWishList(product.id)}
                            className={`fa-solid fa-heart fa-lg cursor-pointer ${
                              isInWishlist ? 'text-red-700' : 'text-black hover:text-red-700'
                            }`}
                          ></i>
                        </div>
                      </div>
                    </div>
                  
                })
              :
                <p className="text-center text-gray-500 text-lg">No products found.</p>
              }
            </div>
          }
  </>

}
