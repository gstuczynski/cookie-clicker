import React, { Component } from "react";
import { func, number } from "prop-types";
import LevelAchievement from "./LevelAchievement";
import ClickSpeedAchievement from "./ClickSpeedAchievement";
import * as actionTypes from "../../store/actionTypes";
import _ from "underscore";
import { connect } from "react-redux";
import "../../styles/achievements.css";

const CLICKSPEED_STEPS_ACHIEVS = [5, 15, 20, 30];
const LEVEL_STEPS_ACHIEVS = [5, 10, 20, 50];
const ACHIEVS_PER_CATEGORY = 4;

class Achievements extends Component {
  static propTypes = {
    onIncreasePoints: func.isRequired,
    points: number.isRequired,
    level: number.isRequired,
    maxAvarageClickTime: number.isRequired
  };

  onCookieClick = () => {
    this.props.onIncreasePoints();
  };

  render() {
    return (
      <div className="achievements">
        <h1>ACHIEVEMENTS</h1>
        {_.times(ACHIEVS_PER_CATEGORY, idx => (
          <div key={`achivments_${idx}`}>
            <LevelAchievement
              currentLevel={this.props.level}
              achievementLevel={LEVEL_STEPS_ACHIEVS[idx]}
            />
            <ClickSpeedAchievement
              maxAvarageClickTime={this.props.maxAvarageClickTime}
              clickSpeedAchiev={CLICKSPEED_STEPS_ACHIEVS[idx]}
            />
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    points: state.points,
    level: state.level,
    maxAvarageClickTime: state.maxAvarageClickTime
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreasePoints: () => dispatch({ type: actionTypes.INCREASE_POINTS })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Achievements);
