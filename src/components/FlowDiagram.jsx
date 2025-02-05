import React, { useState, useEffect, useRef } from "react";

const CustomFlowSVG = ({
  setStep,
  text,
  handleStepButtonClick,
  animating,
  nextStep,
  setNextStep,
  setAnimating,
}) => {
  const circleRef = useRef(null);
  const pathRef = useRef(null);
  const [pathLength, setPathLength] = useState(0);
  const [progress, setProgress] = useState(0); // Progress for animation
  const [highlightedButton, setHighlightedButton] = useState("Step 1"); // Start with Step 1 highlighted

  // Button data for mapping
  const buttons = [
    { step: 0.25, label: "Step 1" },
    { step: 0.35, label: "Step 2" },
    { step: 0.65, label: "Step 3" },
    { step: 1, label: "Step 4" },
  ];

  useEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, []);

  useEffect(() => {
    const animateCircle = () => {
      if (!animating) return; // Only animate if animating is true
      setProgress((prevProgress) => {
        if (prevProgress < nextStep) {
          return Math.min(prevProgress + 0.005, nextStep); // Increment progress
        } else if (prevProgress > nextStep) {
          return Math.max(prevProgress - 0.005, nextStep); // Decrement progress
        } else {
          setAnimating(false); // Stop animation when reaching the target step
          return prevProgress;
        }
      });
    };

    const interval = setInterval(animateCircle, 50); // Update every 50ms
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, [nextStep, animating]);

  useEffect(() => {
    if (circleRef.current && pathRef.current) {
      const point = pathRef.current.getPointAtLength(progress * pathLength);
      circleRef.current.setAttribute("cx", point.x);
      circleRef.current.setAttribute("cy", point.y);

      // Check if the circle is close to any button's position
      buttons.forEach((button) => {
        const threshold = 0.02; // Allow a small margin for "touching"
        if (Math.abs(progress - button.step) < threshold) {
          setHighlightedButton(button.label); // Highlight the button when reached
          setStep(button.label);
        }
      });
    }
  }, [progress, pathLength]); // Recalculate position when progress changes
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
          ref={pathRef}
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

      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => handleStepButtonClick(button.step)}
          style={{
            position: "absolute",
            top:
              index === 0
                ? "-12px"
                : index === 1
                ? "26%"
                : index === 2
                ? "55%"
                : "auto",
            left:
              index === 0
                ? "17px"
                : index === 1
                ? "48%"
                : index === 2
                ? "300px"
                : "20px",
            bottom: index === 3 ? "20px" : "auto",
            backgroundColor:
              highlightedButton === button.label ? "#e31662" : "#e0e0e0",
            color: highlightedButton === button.label ? "white" : "black",
            padding: "20px 40px",
            borderRadius: "30px",
            cursor: "pointer",
            border:
              highlightedButton === button.label
                ? "2px solid #544eb8"
                : "2px solid #544eb8",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s ease", // Smooth transition for all properties
            boxShadow:
              highlightedButton === button.label
                ? "0px 0px 15px rgba(227, 22, 98, 0.6)" // Add shadow for active button
                : "none",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#d21552"; // Change background on hover
            e.target.style.borderColor = "#544eb8"; // Add border change
          }}
          onMouseLeave={(e) => {
            if (highlightedButton !== button.label) {
              e.target.style.backgroundColor = "#e0e0e0"; // Revert back to default
              e.target.style.borderColor = "#544eb8"; // Revert border
            }
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default CustomFlowSVG;
