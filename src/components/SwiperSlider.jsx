import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const SwiperSlider = ({ activeStep }) => {
  const cardTexts = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi.",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nib",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nib",
  ];

  return (
    <div className="swiper-container">
      <div className="card">
        {/* Static Card Layout */}
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          loop={true}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          modules={[Navigation]}
          initialSlide={activeStep} // Set the initial slide based on activeStep
        >
          {cardTexts.map((text, index) => (
            <SwiperSlide key={index}>
              <div className="card-text">{text}</div>
            </SwiperSlide>
          ))}
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
