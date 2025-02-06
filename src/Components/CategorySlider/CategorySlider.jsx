import React, { useEffect, useState } from 'react'
import style from './CategorySlider.module.css'
import axios from 'axios'
import Slider from 'react-slick'

export default function CategorySlider() {
  const [gategories, setCategories] = useState([])
  async function categorySlider() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    // console.log(data);
    setCategories(data.data)


  }

  useEffect(() => {
    categorySlider()
  }, [])
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: 1500,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Tablet
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 768, // Mobile
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Smaller screens
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return <>
    <Slider {...settings}>
      {
        gategories.map((category,index)=>
          <div key={index} className='my-3'>
            <img src={category.image} alt={category.name} className='w-full h-[200px] object-cover object-top'/>
            <h3>{category.name}</h3>
          </div>
        )
      }
    </Slider>
  </>
}
