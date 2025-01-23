import FlowDiagram from "@/components/FlowDiagram";
import SwiperSlider from "@/components/SwiperSlider";
import React from "react";

const Index = () => {
  return (
    <div className="main">
      <div className="box-left">
        <SwiperSlider />
      </div>
      <div className="box-right">
        <FlowDiagram />
      </div>
    </div>
  );
};

export default Index;
