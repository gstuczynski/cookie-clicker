import React from "react";
import { string } from "prop-types";

const AchievementInfo = ({ msg }) => {
  return (
    <div className="achievementInfo">
      <p>{msg}</p>
    </div>
  );
};

AchievementInfo.propTypes = {
  msg: string.isRequired
};

export default AchievementInfo;
