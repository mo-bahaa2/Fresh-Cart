import React from 'react'
import style from './Brands.module.css'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import Spinner from '../Spinner/Spinner'

export default function Brands() {

  function getBrand() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let { data, isLoading, isFetched, error } = useQuery({
    queryKey: ['brands'],
    queryFn: getBrand,
    gcTime:9000000,
    staleTime:500000,
    select: (data) => data.data.data
  })
  // console.log(data);


  return <>
    <div className=''>
      <h5 className=' text-center text-5xl font-bold text-main animate__animated animate__jackInTheBox '><i className="fa-regular fa-copyright"></i> Brands </h5>

      {
        isLoading ? <Spinner /> :
          <div className="flex flex-wrap py-8 gap-y-4 justify-center items-center">
            {
              data.map((brand,index) =>
                <div key={index} className='w-6/12 md:w-3/12  rounded-lg p-2 '>
                  <div className=' rounded-lg border border-solid inset-shadow-xs duration-300 ease-in hover:scale-105 hover:shadow-[0_1px_5px_#0AAD0A]'>
                  <img src={brand.image} className='w-full' alt={brand.name} />
                  <h3 className='text-main text-center pb-2'>{brand.name}</h3>
                  </div>
                </div>)
            }
          </div>

      }
    </div>

  </>
}
