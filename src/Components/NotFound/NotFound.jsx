import React from 'react'
import style from './NotFound.module.css'
import notFound from '../../assets/images/error.svg'
export default function NotFound() {
  
  return <>
    
    <div className='flex items-center justify-center'>
      <img src={notFound} className='w-[60%]' alt="" />
    </div>
  </>
}
