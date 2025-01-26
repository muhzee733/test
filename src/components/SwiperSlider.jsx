import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const SwiperSlider = ({ handleStepButtonClick, nextStep }) => {
  // Define the steps with labels
  const steps = [
    { step: 0.25, label: "Step 1" },
    { step: 0.35, label: "Step 2" },
    { step: 0.65, label: "Step 3" },
    { step: 1, label: "Step 4" },
  ];

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
      const slideIndex = steps.findIndex((stepObj) => stepObj.step === nextStep); // Find the index of nextStep
      if (slideIndex !== -1) {
        // Use the swiper instance to change the active slide dynamically
        swiperRef.current.swiper.slideTo(slideIndex);
      }
    }
  }, [nextStep]);

  const resetSlider = () => {
    handleStepButtonClick(0);
  };

  const goToPreviousStep = () => {
    const currentIndex = steps.findIndex((stepObj) => stepObj.step === nextStep);
    const prevIndex = currentIndex === 0 ? steps.length - 1 : currentIndex - 1;
    handleStepButtonClick(steps[prevIndex].step);
  };

  const goToNextStep = () => {
    const currentIndex = steps.findIndex((stepObj) => stepObj.step === nextStep);
    const nextIndex = currentIndex === steps.length - 1 ? 0 : currentIndex + 1;
    handleStepButtonClick(steps[nextIndex].step);
  };

  return (
    <div className="swiper-container">
      <div className="card">
        <div className="card-header">
          Slide {steps.findIndex((stepObj) => stepObj.step === nextStep) + 1}/4
        </div>
        <Swiper
          ref={swiperRef}
          slidesPerView={1}
          spaceBetween={10}
          navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
          modules={[Navigation]}
        >
          {steps.map((stepObj, index) => (
            <SwiperSlide key={index}>
              <div className="card-text">{cardTexts[index]}</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="swiper-navigation">
        <button
          className="swiper-prev"
          onClick={goToPreviousStep} // Using the updated method for prev
        >
          ❮
        </button>
        <button
          className="swiper-next"
          onClick={goToNextStep} // Using the updated method for next
        >
          ❯
        </button>

        {/* Reset Button - Only active if nextStep is greater than 0.25 (Step 2 and onward) */}
        <button
          className={`reset-button ${nextStep > 0.25 ? "active" : ""}`}
          onClick={resetSlider}
          disabled={nextStep <= 0.25}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default SwiperSlider;
