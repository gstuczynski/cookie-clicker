import React from "react";
import { number } from "prop-types";
import tick from "../../assets/tick.png";

const ClickSpeedAchievement = props => {
  const { maxAvarageClickTime, clickSpeedAchiev } = props;
  return (
    <div className="achievement">
      {maxAvarageClickTime >= clickSpeedAchiev && <img src={tick} />}
      <div className="btn btn-secondary">
        Avarage speed: {clickSpeedAchiev} points per 1s
      </div>
    </div>
  );
};

ClickSpeedAchievement.propTypes = {
  maxAvarageClickTime: number.isRequired,
  clickSpeedAchiev: number.isRequired
};

export default ClickSpeedAchievement;
