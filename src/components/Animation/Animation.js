import React from "react";
import LottieView from "lottie-react-native";

const Animation = ({animationName}) => {
  const animations = {
    loading: require('./animations/loading.json')
  }
  const animation = animations[animationName]
  return (
    <LottieView
      source={animation}
      style={{width: "100%", height: "100%"}}
      autoPlay
      loop
    />
  )
}

export default Animation;