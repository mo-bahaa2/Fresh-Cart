import axios from 'axios';
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as yup from 'yup'

export default function ForgetPass() {
    const [isloading, setIsloading] = useState(false)
    let navigate=useNavigate()
    async function forget(value) {
        try {
            setIsloading(true)
            let resposne = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', value)
            // alert('')
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "success",
                title: "Password reset link sent to your email."
              });
            setIsloading(false)
            setTimeout(()=>{navigate('/verfiy')},1500)
        } catch (error) {
            // console.log(error.message);
            const errorMessage = error.response?.data?.message || "Something went wrong. Please try again.";
            setIsloading(false)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${errorMessage}`,
                confirmButtonColor:'red',
                
                
                
              });
        }
    }
    let validationSchema = yup.object({
        email: yup.string().required('Email is required').email('Oops! Email Required')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema,
        onSubmit: forget

    })
    return <>

        <h2 className=' text-center text-main font-normal mt-3 animate__animated animate__swing animate__delay-0.7s'>Forget Password</h2>
        <div className='h-80 pt-10 space-y-14 '>
            <form className='md:w-1/2 mx-auto pt-4' onSubmit={formik.handleSubmit}>
                <div className="relative z-0 w-full mb-5 group ">
                    <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
                    <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email</label>
                    {
                        formik.errors.email && formik.touched.email &&
                        <div className="p-4 my-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                            {formik.errors.email}
                        </div>
                    }
                    <div><i className={`fa-solid fa-envelope absolute top-4 right-0 ${formik.errors.email && formik.touched.email ? 'text-red-800' :'text-main'}`}></i></div>
                    <div className='flex flex-col md:flex-row justify-between items-center pt-4'>
                        {
                            isloading ? <button type="button" className="text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main">
                                <i className="fa-solid fa-spinner fa-spin-pulse"></i></button> : <button type='submit' className='px-4 py-2 text-sm text-white bg-main focus:bg-active'>Send Reset Link</button>
                        }

                        <Link to={'/login'} className='text-lg text-main hover:text-blue-500 dark:text-blue-400 '>Already Have Account</Link>
                    </div>
                </div>
            </form>

        </div>
    </>
}
