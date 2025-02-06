import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import Spinner from '../Spinner/Spinner';
import { CartContext } from '../../Context/CartContext';
import { WishContext } from '../../Context/WishListContext';

export default function ProductDetails() {
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [related, setRelated] = useState([]);
    let { id } = useParams();
    let { addCardPtoduct } = useContext(CartContext);
    const { addWishList, wishlist } = useContext(WishContext);

    async function getProductDetails(productId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
        setProduct(data.data);
        setLoading(false);
        // Fetch related products after the product details are loaded ( care ) 
        getRelatedProducts(data.data.category._id);
    }

    async function getRelatedProducts(categoryId) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`);
        setRelated(data.data);
    }

    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    const productSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    };

    const relatedSliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };
    const isInWishlist = wishlist.some((item) => item.id === product?.id);
    return<>
            {loading ? <Spinner /> :
                <div className="flex flex-col md:flex-row p-8 items-center">
                    <div className='w-1/4'>
                        <Slider {...productSliderSettings}>
                            {product.images.map((image, index) =>
                                <img 
                                className='w-full h-[250px] md:h-full object-cover mb-8 md:mb-0' key={index} src={image} alt={product.title} />
                            )}
                        </Slider>
                    </div>
                    <div className='w-3/4 ps-4'>
                        <h3>{product.title}</h3>
                        <p className='m-2 text-gray-600'>{product.description}</p>
                        <div className='flex justify-between'>
                            <span>{product.price} EGP</span>
                            <span className=''><i className="fa-solid fa-star rating-color"></i>{product.ratingsAverage}</span>
                        </div>
                        <div className='flex items-center gap-2 mt-2'>
                        <button onClick={() => addCardPtoduct(product.id)} className='btn w-full'>Add to cart</button>
                        <i onClick={() => addWishList(product.id)} className={`fa-solid fa-heart fa-2xl cursor-pointer ${isInWishlist ? 'text-red-700' : 'text-black hover:text-red-700' }`}></i>
                        </div>
                    </div>
                </div>
            }

           
            {related.length > 0 && 
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4 text-center text-main"><i class="fa-solid fa-hard-drive"></i> Related Products</h2>
                    <Slider {...relatedSliderSettings}>
                        {related.map((relatedProduct) => 
                            <div key={relatedProduct._id} className="p-2">
                                <img src={relatedProduct.imageCover} alt={relatedProduct.title} className="w-full h-[400px] object-cover object-top" />
                                <h3 className="text-lg font-semibold mt-2">{relatedProduct.title.split(" ").slice(0, 2).join(" ")}</h3>
                            </div>
                        )}
                    </Slider>
                </div>
            }
        </>
}