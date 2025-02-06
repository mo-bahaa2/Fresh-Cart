import React, { useState } from 'react'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

export default function Categories() {
  function getCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  let { data, isLoading, error } = useQuery({
    queryKey: ['category'],
    queryFn: getCategories,
    staleTime: 500000,
    select: (data) => data.data.data
  })

  const [isLoad, setIsLoad] = useState(false)
  const [relateCate, setRelateCate] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('')

  async function getRelatProduct(subCategoryId,categoryName) {
    try {
      setIsLoad(true)
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${subCategoryId}/subcategories`
      )
      setRelateCate(data.data)
      setIsLoad(false)
      setSelectedCategory(categoryName)
    } catch (err) {
      console.log(err)
      setIsLoad(false)
    }
  }

  return <>
    <>
      <h5 className='text-center text-5xl font-bold text-main animate__animated animate__backInLeft'>
        <i className="fa-solid fa-layer-group"></i> Categories
      </h5>
      {isLoading ? <Spinner /> : (
        <div className="flex flex-wrap py-8 gap-y-4 justify-center items-center">
          {data.map((category, index) => 
            <div key={index} className='w-6/12 md:w-3/12 rounded-lg p-3'>
              <div className='rounded-lg border border-solid inset-shadow-xs duration-300 ease-in hover:scale-105 hover:shadow-[0_1px_5px_#0AAD0A]'
                onClick={() => getRelatProduct(category._id,category.name)}>
                <img src={category.image} className='w-full h-[300px] object-cover object-top' alt={category.name} />
                <h3 className='text-main text-center pb-2'>{category.name}</h3>
              </div>
            </div>
        )}
        </div>
      )}


      {isLoad ? <Spinner /> : <>
        <h5 className='text-center text-5xl font-bold text-main animate__animated animate__backInLeft'><i className="fa-solid fa-layer-group"></i> SubCategories {selectedCategory} </h5>
        <div className="flex flex-wrap py-8 gap-y-4 justify-center items-center">
          
          {relateCate.map((sub, index) => 
            
            <div key={index} className='w-6/12 md:w-3/12 rounded-lg p-3'>
              <div className=' rounded-lg border border-solid inset-shadow-xs duration-300 ease-in hover:scale-105 hover:shadow-[0_1px_5px_#0AAD0A]'>
                <h3 className='text-main text-center py-5'>{sub.name}</h3>
              </div>
            </div>
          )}
        </div>
      </>

      }
    </>
  </>
}
