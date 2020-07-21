import "./Loading.scss";
import React from "react";
import Lottie from "react-lottie";
import { animations, AnimationName } from "resource";

interface LoadingProps {
  animationName?: AnimationName;
  description?: string;
}

const Loading: React.FunctionComponent<LoadingProps> = ({
  description,
  animationName = "spinner",
}) => {
  return (
    <div className="hiveyt-loading">
      <div className="loading-image">
        <Lottie
          options={{
            animationData: animations[animationName],
            autoplay: true,
            loop: true
          }}
        />
      </div>
      {description && <div className="loading-description">{description}</div>}
    </div>
  );
};

export default Loading;
