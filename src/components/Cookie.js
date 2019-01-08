import React, { Component } from "react";
import { func, number } from "prop-types";
import { connect } from "react-redux";
import "../styles/cookie.css";

class Cookie extends Component {
  static propTypes = {
    onIncreasePoints: func.isRequired,
    points: number.isRequired,
    clickValue: number.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      elapsed: null,
      cookieDisabled: true
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onCookieClick = () => {
    this.props.onIncreasePoints(this.props.clickValue);
  };

  onStartGame = () => {
    this.setState({ start: new Date(), cookieDisabled: false });
    this.timer = setInterval(this.tick, 50);
  };

  tick = () => {
    this.setState({ elapsed: new Date() - this.state.start });
  };

  render() {
    let elapsed = Math.round(this.state.elapsed / 100);
    let seconds = (elapsed / 10).toFixed(1);
    let pointGainSpeed = this.props.points / seconds || 0;
    // I'm not sure if update global state that often is good idea - will testing.
    this.props.updateAvarageClickTime(pointGainSpeed.toFixed(1));
    // if (seconds > 0 && seconds % 10 === 0) {
    //   this.props.updateAvarageClickTime(this.props.points / seconds);
    // }

    return (
      <div className="cookie">
        <span className="timer">{seconds}</span>
        <button
          disabled={!this.state.cookieDisabled}
          onClick={this.onStartGame}
        >
          Start Game
        </button>
        <button
          disabled={this.state.cookieDisabled}
          className="cookieButton"
          onClick={this.onCookieClick}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    points: state.points,
    avarageClickTime: state.avarageClickTime,
    clickValue: state.clickValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreasePoints: clickValue =>
      dispatch({ type: "INCREASE_POINTS", clickValue }),
    updateAvarageClickTime: avarageClickTime =>
      dispatch({ type: "UPDATE_AVARAGE_CLICK_TIME", avarageClickTime })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cookie);
