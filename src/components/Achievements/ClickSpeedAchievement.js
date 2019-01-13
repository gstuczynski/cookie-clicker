import React, { Component } from "react";
import { number } from "prop-types";
import AchievementInfo from "./AchievementInfo";
import tick from "../../assets/tick.png";

class ClickSpeedAchievement extends Component {
  static propTypes = {
    maxAvarageClickTime: number.isRequired,
    clickSpeedAchiev: number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showInfoTime: 0,
      unlocked: false
    };
  }

  tick = () => {
    this.setState({
      showInfoTime: this.state.showInfoTime - 1
    });
  };

  render() {
    const { maxAvarageClickTime, clickSpeedAchiev } = this.props;
    const achievementUnlocked = maxAvarageClickTime >= clickSpeedAchiev;
    if (
      achievementUnlocked &&
      this.state.showInfoTime === 0 &&
      !this.state.unlocked
    ) {
      this.setState({
        showInfoTime: 3,
        unlocked: true
      });
      this.timer = setInterval(this.tick, 1000);
    }

    return (
      <div className="achievement">
        {achievementUnlocked && <img src={tick} />}
        {achievementUnlocked &&
          this.state.showInfoTime &&
          !this.state.unlocked > 0 && (
            <AchievementInfo
              msg={`Achievement ${maxAvarageClickTime} points per sec Unlocked`}
            />
          )}
        <div className="btn btn-secondary">
          Avarage speed: {clickSpeedAchiev} points per 1s
        </div>
      </div>
    );
  }
}
export default ClickSpeedAchievement;
