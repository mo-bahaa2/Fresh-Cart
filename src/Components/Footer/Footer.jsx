import React from 'react'
import style from './Footer.module.css'
import prand1 from '../../assets/images/paypal-svgrepo-com-CWQKE2QD.svg'
import prand2 from '../../assets/images/amex-svgrepo-com-a4ebFimK.svg'
import prand3 from '../../assets/images/mastercard-4-logo-svgrepo-com-MQGqscxU.svg'
import prand4 from '../../assets/images/amazon-pay-svgrepo-com-Wigez2Sf.svg'
import store from '../../assets/images/google-play-badge-logo-svgrepo-com-BsUgTMUL.svg'
import store2 from '../../assets/images/download-on-the-app-store-apple-logo-svgrepo-com-DEgUYCrT.svg'
export default function Footer() {
  
  return <>

    <footer className='px-5 bg-gray-200'>
      <div className='container py-12'>
        <h5>Get the FreshCart app</h5>
        <p className='my-2 text-gray-500/50'>We will send you a link, open it on your phone to download the app.</p>
        <div className='px-1 flex flex-col md:flex-row items-center justify-between space-x-5 pb-3 border-b-2'>
            <input type="emial"className='ms-3 p-3 rounded-xl w-full md:w-fit focus:outline-secondary flex-grow my-4' placeholder='Mail...' />
            <button className='text-white bg-main hover:bg-main focus:ring-4 focus:outline-none focus:ring-main font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-main dark:hover:bg-main dark:focus:ring-main'>Share App Link</button>
        </div>
        <div className='px-1 pb-3 border-y-2 border-gray-300 flex flex-col md:flex-row space-y-5 md:space-y-0 '> 
          <div className='flex md:w-6/12 items-center flex-col md:flex-row py-7 md:space-x-6'>
          <h6 className='text-xl md:text-2xl text-gray-600 '>Payment Partners</h6>
          <div className='flex my-6 md:my-0 gap-3'>
            <div className='w-3/12'>
              <img src={prand1} alt="prand1" className='w-full md:w-14 rounded-md' />
            </div>
            <div className='w-3/12'>
              <img src={prand2} alt="prand1" className='w-full md:w-14 rounded-md' />
            </div>
            <div className='w-3/12'>
              <img src={prand3} alt="prand1" className='w-full md:w-14 rounded-md' />
            </div>
            <div className='w-3/12'>
              <img src={prand4} alt="prand1" className='w-full md:w-14 rounded-md' />
            </div>
          </div>
          </div>
          <div className='flex flex-col md:flex-row md:w-6/12 justify-end  items-center space-x-0 md:space-x-5'>
              <h5 className='text-xl md:text-2xl text-gray-600'>Get deliveries with FreshCart</h5>
                  <div className='w-full md:w-[15%] cursor-pointer'>
                    <img src={store} alt="Google play" className='w-full md:w-90  rounded-md' />
                  </div>
                  <div className='w-full md:w-[15%] cursor-pointer'>
                    <img src={store2} alt="app Store" className='w-full md:w-90  rounded-md' />
                  </div>
          </div>
        </div>
      </div>
    </footer>
  
  </>
}
