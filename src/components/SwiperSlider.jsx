import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const SwiperSlider = ({ step }) => {
  console.log(step);

  // Static card texts
  const cardTexts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  ];

  // Create a ref to control the swiper instance
  const swiperRef = useRef(null);

  // Handle the step change and update the active slide
  useEffect(() => {
    if (swiperRef.current) {
      let slideIndex = 0;

      if (step === "Step 2") {
        slideIndex = 1; // 2nd slide
      } else if (step === "Step 3") {
        slideIndex = 2; // 3rd slide
      } else if (step === "Step 4") {
        slideIndex = 3; // 4th slide
      }

      // Use the swiper instance to change the active slide dynamically
      swiperRef.current.swiper.slideTo(slideIndex);
    }
  }, [step]);

  return (
    <div className="swiper-container">
      <div className="card">
        {/* Static Card Layout */}
        <Swiper
          ref={swiperRef} // Connect swiperRef to Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          modules={[Navigation]}
        >
          <SwiperSlide>
            <div className="card-text">{cardTexts[0]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-text">{cardTexts[1]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-text">{cardTexts[2]}</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card-text">{cardTexts[3]}</div>
          </SwiperSlide>
        </Swiper>
      </div>

      <div className="swiper-navigation">
        <button className="swiper-prev">❮</button>
        <button className="swiper-next">❯</button>
      </div>
    </div>
  );
};

export default SwiperSlider;
