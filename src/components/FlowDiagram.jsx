import React, { useState, useEffect, useRef } from "react";
import Swiper from "swiper";
import "swiper/css"; // Import Swiper styles
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const CustomFlowSVG = () => {
  const [highlightedButton, setHighlightedButton] = useState(null);
  const circleRef = useRef(null); // Reference for the moving circle
  const buttonsRef = useRef([]); // References for the buttons
  const swiperRef = useRef(null); // Ref for Swiper instance

  useEffect(() => {
    const animationDuration = 10000; // Total animation duration in milliseconds
    const pathElement = document.getElementById("animated-path");
    const pathLength = pathElement.getTotalLength();

    const animateLoop = () => {
      let startTime = Date.now();

      const updateCirclePosition = () => {
        const elapsedTime = Date.now() - startTime;
        const progress = Math.min(elapsedTime / animationDuration, 1); // Ensure it doesn't go beyond 100%

        // Calculate the position on the path
        const position = pathLength * progress;
        const { x, y } = pathElement.getPointAtLength(position);

        // Update the circle's position
        const circle = circleRef.current;
        if (circle) {
          circle.setAttribute("cx", x);
          circle.setAttribute("cy", y);
        }

        // Check for collision with buttons
        buttonsRef.current.forEach((button, index) => {
          if (button) {
            const buttonRect = button.getBoundingClientRect();
            const circleRect = circle.getBoundingClientRect();

            // Simple collision detection
            const isTouching =
              circleRect.right > buttonRect.left &&
              circleRect.left < buttonRect.right &&
              circleRect.bottom > buttonRect.top &&
              circleRect.top < buttonRect.bottom;

            if (isTouching) {
              setHighlightedButton(index); // Highlight the button being touched
              // Move to corresponding slide in Swiper
              if (swiperRef.current) {
                swiperRef.current.swiper.slideTo(index); // Slide to the active slide
              }
            }
          }
        });

        // If the animation is complete, restart the animation
        if (progress < 1) {
          requestAnimationFrame(updateCirclePosition);
        } else {
          // Hide the circle briefly, reset its position, and restart the animation
          if (circle) {
            circle.style.opacity = "0"; // Hide the circle
          }
          setTimeout(() => {
            if (circle) {
              circle.style.opacity = "1"; // Reappear the circle
            }
            startTime = Date.now(); // Reset start time
            setHighlightedButton(null); // Reset button highlight
            requestAnimationFrame(updateCirclePosition); // Restart animation
          }, 500); // 500ms delay for the "disappear and reappear" effect
        }
      };

      requestAnimationFrame(updateCirclePosition);
    };

    animateLoop();
  }, []);

  return (
    <div style={{ position: "relative", width: "600px", margin: "auto" }}>
      <svg
        height="auto"
        viewBox="-10 -10 479 380"
        fill="none"
        style={{ width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M57.9231 1.02979H401.077C432.515 1.02979 458 26.5151 458 57.9529C458 89.3907 432.515 114.876 401.077 114.876L57.9231 114.069C26.4854 114.069 1 139.554 1 170.992C1 202.43 26.4854 227.915 57.9232 227.915L401.077 227.108C432.515 227.108 458 252.593 458 284.031C458 315.468 432.515 340.954 401.077 340.954H57.9232"
          id="animated-path"
          stroke="url(#paint0_linear)"
          strokeWidth="1.61484"
        />
        <circle
          ref={circleRef}
          r="10"
          fill="blue"
          style={{ transition: "all 0.1s linear" }}
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="128.169"
            y1="1.02978"
            x2="508.706"
            y2="241.902"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#4765E6" />
            <stop offset="0.46" stopColor="#5C4099" />
            <stop offset="1" stopColor="#E31662" />
          </linearGradient>
        </defs>
      </svg>
      <div
        ref={(el) => (buttonsRef.current[0] = el)}
        style={{
          position: "absolute",
          top: "0px",
          left: "70px",
          background:
            highlightedButton === 0 ? "hsl(338,82%,49%,1)" : "#4765E6",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        Step 1
      </div>
      <div
        ref={(el) => (buttonsRef.current[1] = el)}
        style={{
          position: "absolute",
          top: "140px",
          left: "200px",
          background:
            highlightedButton === 1 ? "hsl(338,82%,49%,1)" : "#4765E6",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        Step 2
      </div>
      <div
        ref={(el) => (buttonsRef.current[2] = el)}
        style={{
          position: "absolute",
          top: "277px",
          left: "350px",
          background:
            highlightedButton === 2 ? "hsl(338,82%,49%,1)" : "#4765E6",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        Step 3
      </div>
      <div
        ref={(el) => (buttonsRef.current[3] = el)}
        style={{
          position: "absolute",
          top: "420px",
          left: "70px",
          background:
            highlightedButton === 3 ? "hsl(338,82%,49%,1)" : "#4765E6",
          color: "white",
          padding: "10px 20px",
          borderRadius: "30px",
          cursor: "pointer",
        }}
      >
        Step 4
      </div>
    </div>
  );
};

export default CustomFlowSVG;
