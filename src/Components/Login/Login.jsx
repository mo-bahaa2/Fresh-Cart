import React, { useContext, useState } from 'react'
import style from './Login.module.css'
import { Formik, useFormik, validateYupSchema } from 'formik';
import * as yup from 'yup'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Context/UserContext';
export default function Login() {
  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [passwordHidden, setPasswordHidden] = useState(true);
  let navigate=useNavigate();
  let { setUserToken } = useContext(UserContext)
  async function login(value) {
    setLoading(true)
    try {
      let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, value)
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
    email: yup.string().required('Email is required').email('Invalid email'),
    password: yup.string().required('Password is required').matches(/^[A-Z]\w{4,10}$/, 'Password must be at least 8 characters long with capital one letter ( A ) at least ex:( Mohamed23153 )'),
  })

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: login
  })

  return <>
    <h2 className=' text-center text-main font-bold mt-3'>Login</h2>

    <div className='h-72'>
      <form className="md:w-1/2 mx-auto pt-4" onSubmit={formik.handleSubmit}>
        {apiError && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {apiError}
        </div>
        }


        <div className="relative z-0 w-full mb-5 group ">
          <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
          <div><i className={`fa-solid fa-envelope absolute top-4 right-0 ${formik.errors.email && formik.touched.email ? 'text-red-800' :'text-main'}`}></i></div>
        </div>
        {formik.errors.email && formik.touched.email && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.email}
        </div>
        }

        <div className="relative z-0 w-full mb-5 group flex items-center ">
          <input type={passwordHidden ? 'password' : 'text'} name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password </label>
          <div><i onClick={() => setPasswordHidden(!passwordHidden)} className={`fa-solid  absolute top-4 right-0 cursor-pointer ${passwordHidden ? 'fa-eye-slash' : 'fa-eye'} ${formik.errors.password && formik.touched.password ? 'text-red-800' :'text-main'}`}></i></div>
        </div>
        {formik.errors.password && formik.touched.password && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
          {formik.errors.password}
        </div>
        }


        <div className='flex flex-col md:flex-row justify-between items-center'>
          {
            loading ? <button type="button" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            </button> : <button type="submit" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">Submit</button>

          }
          <Link to={'/forget'} className="text-lg text-main hover:text-blue-500 dark:text-blue-400 ">Forgot Password?</Link>
        </div>
      </form>
    </div>


  </>
}
