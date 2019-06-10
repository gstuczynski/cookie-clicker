import React from "react";
import { number } from "prop-types";
import tick from "../../assets/tick.png";

const LevelAchievement = props => {
  const achievementLevel = props.achievementLevel;
  const currentLevel = props.currentLevel;

  const progressPercent = (currentLevel * 100) / achievementLevel;
  return (
    <div className="achievement">
      {currentLevel >= achievementLevel && <img src={tick} alt="tick" />}
      <div className="progress">
        <div
          className={"progress-bar"}
          style={{ width: `${progressPercent}%` }}
        >{`Level ${achievementLevel}`}</div>
      </div>
    </div>
  );
};

LevelAchievement.propTypes = {
  currentLevel: number.isRequired,
  achievementLevel: number.isRequired
};

export default LevelAchievement;
