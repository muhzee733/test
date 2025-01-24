import FlowDiagram from "@/components/FlowDiagram";
import SwiperSlider from "@/components/SwiperSlider";
import React, { useState } from "react";

const Index = () => {
  const [step, setStep] = useState('');
  return (
    <div className="main">
      <div className="box-left">
        <SwiperSlider step={step}/>
      </div>
      <div className="box-right">
        <FlowDiagram setStep={setStep}/>
      </div>
    </div>
  );
};

export default Index;
