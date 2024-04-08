import React from "react";
import LottieView from "lottie-react-native";

const Animation = ({animationName}) => {
  const animationPath = ``;  
  return (
    <LottieView
      source={require('./animations/loading.json')}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop
    />
  );
}

export default Animation;