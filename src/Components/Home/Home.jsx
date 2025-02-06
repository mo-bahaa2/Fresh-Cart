import React, { useEffect, useState } from 'react'
import style from './Home.module.css'
import axios from 'axios'
import Products from '../Products/Products'
import CategorySlider from '../CategorySlider/CategorySlider'
import MainSlider from '../MainSlider/MainSlider'
import RecentProduct from '../RecentProduct/RecentProduct'
export default function Home() {


  return <>
    <MainSlider/>
    <CategorySlider/>
    <RecentProduct/>
  </>
}
