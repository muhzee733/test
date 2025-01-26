import FlowDiagram from "@/components/FlowDiagram";
import SwiperSlider from "@/components/SwiperSlider";
import React, { useState } from "react";

const Index = () => {
  const [step, setStep] = useState("Step 1");
  const [text, setText] = useState(0.25); // Initial step is 0.25
  const [nextStep, setNextStep] = useState(0.25); // Default step value
  const [animating, setAnimating] = useState(false);

  const handleStepButtonClick = (newStep) => {
    setNextStep(newStep); // Set the new step
    setAnimating(true); // Trigger animation
  };

  return (
    <div className="main">
      <div className="box-left">
        <SwiperSlider 
          step={step} 
          setText={setText} 
          handleStepButtonClick={handleStepButtonClick}
          nextStep={nextStep}
        />
      </div>
      <div className="box-right">
        <FlowDiagram 
          setStep={setStep} 
          text={text} 
          setNextStep={setNextStep} 
          setAnimating={setAnimating} 
          handleStepButtonClick={handleStepButtonClick} 
          nextStep={nextStep} 
          animating={animating}
        />
      </div>
    </div>
  );
};

export default Index;
