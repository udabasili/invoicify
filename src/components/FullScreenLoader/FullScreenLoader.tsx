import React from 'react'
import groovyWalkAnimation from "@/data/loading.json";
import Lottie from "lottie-react";

const FullScreenLoader = () => {

  return ( 
    <Lottie 
        animationData={groovyWalkAnimation} 
        className="h-screen w-screen"
    />
  )

};

export default FullScreenLoader;
