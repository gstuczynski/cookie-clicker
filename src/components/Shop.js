import React, { Component } from "react";
import { func, number, bool } from "prop-types";
import { connect } from "react-redux";
import cn from "classnames";
import "../styles/shop.css";

class Shop extends Component {
  static propTypes = {
    onIncreasePoints: func.isRequired,
    points: number.isRequired,
    lockBonus: func.isRequired,
    morePointPerClickActive: bool.isRequired,
    clickValue: number.isRequired
  };

  static defaultProps = {
    points: 0
  };

  constructor() {
    super();
    this.state = {
      stopAutoClicker: 0
    };
  }

  onCookieClick = () => {
    this.props.onIncreasePoints();
  };

  startAutoClicker = () => {
    this.props.lockBonus("clickerActive");
    this.setState({
      stopAutoClicker: 60
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
        <button
          disabled={!this.props.clickerActive}
          onClick={this.startAutoClicker}
          className={cn("btn btn-primary")}
        >
          Adding 1 point per {this.state.stopAutoClicker}s.
        </button>
        <button
          disabled={!this.props.morePointPerClickActive}
          onClick={this.props.increaseClickValue}
          className={cn("btn btn-primary")}
        >
          Each click will be be worth {this.props.clickValue + 1}
        </button>
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
    increaseClickValue: () => dispatch({ type: "INCREASE_CLICK_VALUE" })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shop);
