import axios from 'axios';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import * as yup from 'yup'
export default function VerfiyCode() {
  const [alert, setAlert] = useState(true)
  const [loading, setLoading] = useState(false)
  let navigate =useNavigate()
  useEffect(() => {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2500,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      showClass: {
        popup: `
          animate__animated
          animate__lightSpeedInRight
          animate__faster
        `
      },
      icon: "success",
      title: "Check Your Mail"
    });

  }, [])

  async function verfiy(value) {
    try {
      setLoading(true)
      console.log(value);
      let resposne = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, value)
      console.log(resposne.data.status);
      setLoading(false)
      navigate('/resetpass')
    } 
    catch (err) {
      const error=err.resposne?.status||'Reset code is invalid or has expired';
      console.log(error);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
      Toast.fire({
        icon: "error",
        title: `${error}`,
        hideClass: {
          popup: `
            animate__animated
            animate__hinge
            animate__faster
          `
        }
      });
      setLoading(false)
    }
  }

  let validationSchema = yup.object({
    resetCode: yup.string().required('Verification Code is required').min(6, 'Verification Code must be at least 6 digits')
  })

  const formik = useFormik({
    initialValues: {
      resetCode: '',
    },
    validationSchema,
    onSubmit: verfiy

  })
  return <>
    <div className='h-72'>
      <h2 className=' text-center text-main font-normal mt-3 animate__animated animate__tada animate__delay-0.7s'>Verify Code</h2>
      <form className='md:w-1/2 mx-auto pt-4' onSubmit={formik.handleSubmit} >
        <div className="relative z-0 w-full mb-5 group ">
          <input type="text" name="resetCode" id="resetCode" value={formik.values.resetCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-main focus:outline-none focus:ring-0 focus:border-green-500 peer" placeholder=" " />
          <label htmlFor="resetCode" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-500 peer-focus:dark:text-main peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Reset Code</label>
          {
            formik.errors.resetCode && formik.touched.resetCode &&
            <div className="flex items-center p-4 mt-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                <span className="font-medium">Warning! </span> {formik.errors.resetCode}
              </div>
            </div>
          }
          <div><i className={`fa-solid fa-hashtag absolute top-4 right-0 ${formik.errors.resetCode?'text-red-800':'text-main'}`}></i></div>
          {
            loading ? <button type='submit' className='text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main'><i className="fa-solid fa-spinner fa-spin-pulse"></i></button>
              :
              <button type='submit' className='text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-3 py-1.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main'>Submit</button>
          }

        </div>
      </form>

    </div>
  </>
}
