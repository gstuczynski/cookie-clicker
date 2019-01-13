import React, { Component } from "react";
import { func, number, bool } from "prop-types";
import { connect } from "react-redux";
import ReactTooltip from "react-tooltip";
import * as actionTypes from "../../store/actionTypes";
import ClickerBonus from "./ClickerBonus";
import ClickValueBonus from "./ClickValueBonus";
import "../../styles/shop.css";

const PERMANET_CLICKER_COST = 1000;

class Shop extends Component {
  static propTypes = {
    onIncreasePoints: func.isRequired,
    points: number.isRequired,
    lockBonus: func.isRequired,
    morePointPerClickActive: bool.isRequired,
    clickValue: number.isRequired,
    decreasePoints: func.isRequired,
    clickerActive: bool.isRequired,
    increaseClickValue: func.isRequired,
    permanentClickerValue: number.isRequired
  };

  static defaultProps = {
    points: 0
  };

  constructor() {
    super();
    this.state = {
      stopAutoClicker: 60,
      autoClickerValue: 1
    };
  }

  onCookieClick = () => {
    this.props.onIncreasePoints();
  };

  startAutoClicker = () => {
    this.props.lockBonus("clickerActive");
    this.props.decreasePoints(100);
    this.setState({
      stopAutoClicker: 60,
      autoClickerValue: this.state.autoClickerValue + 1
    });
    this.timer = setInterval(this.tick, 1000);
  };

  startPermanentAutoClicker = () => {
    this.props.lockBonus("clickerActive");
    this.permanentTimer = setInterval(
      () => this.props.onIncreasePoints(this.props.permanentClickerValue),
      1000
    );
    this.props.decreasePoints(PERMANET_CLICKER_COST);
  };

  tick = () => {
    const { stopAutoClicker } = this.state;
    if (stopAutoClicker <= 0) {
      clearInterval(this.timer);
    }
    this.setState({ stopAutoClicker: stopAutoClicker - 1 });
    this.props.onIncreasePoints(1);
  };

  render() {
    return (
      <div className="shop">
        <h1>SHOP</h1>
        <div data-tip=" After each use points per secound are increased. Unlocked every 5 levels ">
          <ClickerBonus
            active={this.props.clickerActive && this.props.points > 100}
            onClick={this.startAutoClicker}
            text={`On minute of additional ${
              this.state.autoClickerValue
            } point per sec. Left: ${this.state.stopAutoClicker}s`}
            cost={100}
          />
        </div>
        <ReactTooltip />
        <div data-tip="After each use points per click are increased, unlocked every 100 points">
          <ClickValueBonus
            active={!this.props.morePointPerClickActive}
            onClick={this.props.increaseClickValue}
            value={this.props.clickValue}
          />
        </div>
        <div
          data-tip={` Adding ${
            this.props.permanentClickerValue
          }/s until you close window. Each use increase valeue per s. cost 1000 points `}
        >
          <ClickerBonus
            active={this.props.clickerActive && this.props.points > 1000}
            onClick={this.startPermanentAutoClicker}
            text={`Unlimited adding ${
              this.props.permanentClickerValue
            } point per second`}
            cost={PERMANET_CLICKER_COST}
          />
        </div>
        <ReactTooltip />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    points: state.points,
    level: state.level,
    clickerActive: state.clickerActive,
    morePointPerClickActive: state.morePointPerClickActive,
    clickValue: state.clickValue,
    permanentClickerValue: state.permanentClickerValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreasePoints: clickValue =>
      dispatch({ type: actionTypes.INCREASE_POINTS, clickValue }),
    lockBonus: name => dispatch({ type: actionTypes.LOCK_BONUS, name }),
    increaseClickValue: () =>
      dispatch({ type: actionTypes.INCREASE_CLICK_VALUE }),
    decreasePoints: val =>
      dispatch({ type: actionTypes.DECREASE_POINTS, pointsDec: val }),
    incereasePermanentClickValue: () =>
      dispatch({ type: actionTypes.INCREASE_PERMANENT_CLICKER_VALUE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
