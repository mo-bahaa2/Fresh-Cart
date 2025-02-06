    import { useQuery } from '@tanstack/react-query';
    import axios from 'axios';
    import React, { useContext } from 'react';
    import Spinner from '../Spinner/Spinner';
    import { CartContext } from '../../Context/CartContext';
    import { WishContext } from '../../Context/WishListContext';

    export default function WishList() {

        let{addCardPtoduct}=useContext(CartContext)
        let{deleteWishList}=useContext(WishContext)
        
        function getWishData() {
            return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                headers: {
                    token: localStorage.getItem('userToken'),
                }
            })
        }

        let { data, isError, isFetched, isLoading ,refetch} = useQuery({
            queryKey: ['wishData'],
            queryFn: getWishData,
            select: (response) => response.data?.data || []  
        });

        async function handleAddToCartAndRemove(wishId) {
            await addCardPtoduct(wishId); // Add to Cart
            await deleteWishList(wishId, refetch); // Remove from Wishlist
        }
    

        return<>
            <div className='bg-slate-50 p-4 mt-10'>
                <div className='text-center font-bold text-3xl'> My Wish List <i className="fa-solid fa-heart text-red-600"></i></div>
                {isLoading ? 
                    <Spinner />
                : 
                    <div className='flex flex-col gap-4'>
                        {data.length > 0 ? 
                            data.map((wish) => 
                                <div key={wish._id} className='flex flex-col md:flex-row items-center p-4 border-b'>
                                    <div className='me-3 '>
                                        <img src={wish.imageCover} alt={wish.title} className='w-[200px]'/>
                                    </div>
                                    <div className='w-10/12 flex justify-center items-center flex-col md:flex-row md:justify-between pl-4'>
                                        <div className='md:w-9/12'>
                                            <h3 className='text-lg font-semibold'>{wish.title.split(" ",2).join(" ")}</h3>
                                            <p className='text-main font-bold'>{wish.price} EG</p>
                                            <button onClick={()=>deleteWishList(wish._id,refetch)} className=' px-3.5 py-1.5  rounded-lg bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-700'>remove</button>
                                        </div>
                                        <div className='md:w-2/12'>
                                            <button onClick={() => handleAddToCartAndRemove(wish._id)}> Add To Cart</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        :
                            <p className='text-center text-gray-500 mt-10 text-3xl'>No items in your wishlist <i className="fa-solid fa-circle-exclamation"></i></p>
                        }
                    </div>
                }
            </div>
            </>
    }
