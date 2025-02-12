import React, { useState, useContext } from 'react';
import style from './CheckOut.module.css';
import { useFormik } from 'formik';
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function CheckOut() {
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { card } = useContext(CartContext);
  const { clearCart } = useContext(CartContext);
  let navigate = useNavigate()
  
  // Function for Visa payment
  const visaPayment = async (shippingAddress) => {
    setLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${card.cartId}?url=https://fresh-cart-ecru-tau.vercel.app/allorders`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      toast.success(data.status);
      // return to allOrder component  
      location.href = data.session.url; 
    } catch (err) {
      console.error(err);
      setApiError(err.response.data.message);
      setLoading(false);
    }
  };

  // Function for Cash payment
  const cashPayment = async (shippingAddress) => {
    setLoading(true);
    try {
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/orders/${card.cartId}`,
        { shippingAddress },
        {
          headers: {
            token: localStorage.getItem('userToken'),
          },
        }
      );
      toast.success(data.status);
      navigate('/allorders');
      clearCart();
    } catch (err) {
      console.error(err);
      setApiError(err.response?.data?.message || 'An error occurred');
      setLoading(false);
    }
  };

  // Formik setup
  const formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: '',
    },
    onSubmit: (values) => {
      // call either the visaPayment or cashPayment 
    },
  });

  return <>
    <h2 className="text-center text-main font-bold mt-3">
      CheckOut <i className="fa-solid fa-money-bill"></i>
    </h2>

    <div className="h-72">
      <form className="md:w-1/2 mx-auto pt-4" onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="city"
            id="city"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="city"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your city
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="details"
            id="details"
            value={formik.values.details}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="details"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your details
          </label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="tel"
            name="phone"
            id="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer"
            placeholder=" "
          />
          <label
            htmlFor="phone"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter Your phone
          </label>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          {loading ?
            <button
              type="button"
              className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main"
            >
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </button>
            :
            <>
              <button
                type="button"
                onClick={() => visaPayment(formik.values)}
                className="text-white bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-500"
              >
                Visa Payment
              </button>

              <button
                type="button"
                onClick={() => cashPayment(formik.values)}
                className="text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-500 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-500"
              >
                Cash Payment
              </button>
            </>
          }
        </div>
      </form>
    </div>
  </>

}
