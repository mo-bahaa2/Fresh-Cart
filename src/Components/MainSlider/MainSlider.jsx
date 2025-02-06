import React from 'react';
import style from './MainSlider.module.css';
import img1 from '../../assets/images/slider-2.jpeg';
import img2 from '../../assets/images/grocery-banner-2.jpeg';
import slider1 from '../../assets/images/slider-image-1.jpeg';
import slider2 from '../../assets/images/slider-image-2.jpeg';
import slider3 from '../../assets/images/slider-image-3.jpeg';
import Slider from 'react-slick';

export default function MainSlider() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  return (
    <>
      <div className="flex flex-col md:flex-row">
        {/* Main Slider */}
        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            <div>
              <img
                src={slider1}
                className="w-full h-[200px] md:h-[400px] object-cover"
                alt="slider1"
              />
            </div>
            <div>
              <img
                src={slider2}
                className="w-full h-[200px] md:h-[400px] object-cover"
                alt="slider2"
              />
            </div>
            <div>
              <img
                src={slider3}
                className="w-full h-[200px] md:h-[400px] object-cover"
                alt="slider3"
              />
            </div>
          </Slider>
        </div>

        {/* Side Images */}
        <div className="w-full md:w-1/4 flex flex-col ">
          <img
            src={img1}
            className="w-full h-[150px] md:h-[200px] object-cover"
            alt="img1"
          />
          <img
            src={img2}
            className="w-full h-[150px] md:h-[200px] object-cover"
            alt="img2"
          />
        </div>
      </div>
    </>
  );
}
