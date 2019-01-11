import React from "react";
import { number } from "prop-types";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes";
import "../styles/stats.css";

const Stats = ({
  points,
  avarageClickTime,
  level,
  clickValue,
  maxAvarageClickTime
}) => (
  <div className="stats">
    <h1>STATS</h1>
    <ul className="list-group">
      <li className="list-group-item">Points: {points}</li>
      <li className="list-group-item">
        Current avarage point gained time: {avarageClickTime}
      </li>
      <li className="list-group-item">Level: {level}</li>
      <li className="list-group-item">Points per click: {clickValue}</li>
      <li className="list-group-item">
        Best average point gained time: {maxAvarageClickTime}
      </li>
    </ul>
  </div>
);

Stats.propTypes = {
  points: number.isRequired,
  avarageClickTime: number.isRequired,
  level: number.isRequired,
  clickValue: number.isRequired,
  maxAvarageClickTime: number.isRequired
};

const mapStateToProps = state => {
  return {
    points: state.points,
    avarageClickTime: state.avarageClickTime,
    level: state.level,
    clickValue: state.clickValue,
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
)(Stats);
