import React, { useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik, validateYupSchema } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../Context/UserContext';


export default function Register() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [rePasswordHidden, setRePasswordHidden] = useState(true);


  let { setUserToken } = useContext(UserContext)
  let navigate = useNavigate();

  async function register(value) {
    setLoading(true)
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, value)
      console.log(data);
      localStorage.setItem('userToken', data.token)
      setUserToken(data.token)
      navigate('/')

    } catch (err) {
      console.log(err);
      setApiError(err.response.data.message)
      setLoading(false)
    }

  }

  let validationSchema = yup.object({
    name: yup.string().required('Name is required').max(15, 'you should not put more than 15 characters ').min(3, 'you should have at least 3 characters'),
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').matches(/^[A-Z]\w{4,10}$/, 'Password must be at least 8 characters long with capital one letter ( A ) at least ex:( Mohamed23153 )'),
    rePassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords must match'),
    phone: yup.string().required('Phone Number is required').matches(/^01[0125][0-9]{8}$/, 'Phone number must be 10 digits long and egypt phone number ')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',

    },
    validationSchema,
    onSubmit: register
  })



  return <>
    <h2 className=' text-center text-main font-bold mt-3'>Register</h2>

    <div className=''>
      <form className="md:w-1/2 mx-auto pt-4" onSubmit={formik.handleSubmit}>
        {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>
        }
        <div className="relative z-0 w-full mb-5 group ">
          <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name</label>
          <div><i className="fa-solid fa-user absolute top-4 right-0"></i></div>
        </div>
        {formik.errors.name && formik.touched.name && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.name}
        </div>
        }

        <div className="relative z-0 w-full mb-5 group ">
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          <div><i className="fa-solid fa-envelope absolute top-4 right-0"></i></div>
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>
        }

        <div className="relative z-0 w-full mb-5 group flex items-center ">
          <input type={passwordHidden ? 'password' : 'text'} name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password </label>
          <div><i onClick={() => setPasswordHidden(!passwordHidden)} className={`fa-solid  absolute top-4 right-0 cursor-pointer ${passwordHidden ? 'fa-eye-slash' : 'fa-eye'}`}></i></div>
        </div>
        {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>
        }

        <div className="relative z-0 w-full mb-5 group">
          <input type={rePasswordHidden ? 'password' : 'text'} name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="rePassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password again</label>
          <div><i onClick={() => setRePasswordHidden(!rePasswordHidden)} className={`fa-solid  absolute top-4 right-0 cursor-pointer ${rePasswordHidden ? 'fa-eye-slash' : 'fa-eye'}`}></i></div>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.rePassword}
        </div>
        }

        <div className="relative z-0 w-full mb-5 group">
          <input type="tel" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number</label>
          <div><i className="fa-solid fa-mobile-alt absolute top-4 right-0"></i></div>
        </div>
        {formik.errors.phone && formik.touched.phone && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.phone}
        </div>
        }
        <div className='flex flex-col md:flex-row items-center justify-between'>
          {
            loading ? <button type="button" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </button> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>

          }
          <Link to={'/login'} className="text-lg text-main hover:text-blue-500 dark:text-blue-400">Have Email Already</Link>
        </div>
      </form>
    </div>


  </>
}
