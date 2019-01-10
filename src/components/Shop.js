import React, { Component } from "react";
import { func, number, bool } from "prop-types";
import { connect } from "react-redux";
import cn from "classnames";
import ReactTooltip from "react-tooltip";
import "../styles/shop.css";
import locked from "../assets/locked.png";
import unlocked from "../assets/unlocked.png";

class Shop extends Component {
  static propTypes = {
    onIncreasePoints: func.isRequired,
    points: number.isRequired,
    lockBonus: func.isRequired,
    morePointPerClickActive: bool.isRequired,
    clickValue: number.isRequired,
    decreasePoints: func.isRequired,
    clickerActive: bool.isRequired
  };

  static defaultProps = {
    points: 0
  };

  constructor() {
    super();
    this.state = {
      stopAutoClicker: 0,
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

  tick = () => {
    const { stopAutoClicker } = this.state;
    if (stopAutoClicker <= 0) {
      clearInterval(this.timer);
    }
    this.setState({ stopAutoClicker: stopAutoClicker - 1 });
    this.props.onIncreasePoints();
  };

  render() {
    return (
      <div className="shop">
        <h1>SHOP</h1>
        <div data-tip="After each use points per secound are increased. Unlocked every 5 levels">
          <button
            disabled={!this.props.clickerActive}
            onClick={this.startAutoClicker}
            className={cn("btn btn-primary")}
          >
            {this.props.clickerActive ? (
              <img src={unlocked} />
            ) : (
              <img src={locked} />
            )}
            Adding {this.state.autoClickerValue} point per{" "}
            {this.state.stopAutoClicker}s.{" "}
            <span style={{ color: "red" }}>Cost 100p.</span>
          </button>
        </div>
        <ReactTooltip />
        <div data-tip="After each use points per click are increased, unlocked every 100 points">
          <button
            disabled={!this.props.morePointPerClickActive}
            onClick={this.props.increaseClickValue}
            className={cn("btn btn-primary")}
          >
            {this.props.morePointPerClickActive ? (
              <img src={unlocked} />
            ) : (
              <img src={locked} />
            )}
            Each click will be be worth {this.props.clickValue + 1}
          </button>
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
    clickValue: state.clickValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreasePoints: () => dispatch({ type: "INCREASE_POINTS" }),
    lockBonus: name => dispatch({ type: "LOCK_BONUS", name }),
    increaseClickValue: () => dispatch({ type: "INCREASE_CLICK_VALUE" }),
    decreasePoints: val => dispatch({ type: "DECREASE_POINTS", pointsDec: val })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
