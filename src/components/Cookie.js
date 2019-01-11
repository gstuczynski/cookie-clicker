import React, { Component } from "react";
import { func, number, instanceOf, string } from "prop-types";
import { connect } from "react-redux";
import * as actionTypes from "../store/actionTypes";
import _ from "underscore";
import "../styles/cookie.css";

class Cookie extends Component {
  static propTypes = {
    onIncreasePoints: func.isRequired,
    points: number.isRequired,
    clickValue: number.isRequired,
    saveStartGameTime: func.isRequired,
    startGameTime: string, // instanceOf(Date),
    clearStorage: func.isRequired
  };

  static defaultProps = {
    startGameTime: null
  };

  constructor(props) {
    super(props);

    let state = {
      elapsed: 0,
      cookieDisabled: true,
      cookieClicked: false
    };

    if (this.props.startGameTime) {
      state.cookieDisabled = false;
      state.elapsed = new Date() - new Date(this.props.startGameTime);
      this.timer = setInterval(this.tick, 50);
    }

    this.state = state;
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  onCookieClick = () => {
    this.setState({ cookieClicked: true });
    this.props.onIncreasePoints(this.props.clickValue);
  };

  onStartGame = () => {
    this.setState({
      cookieDisabled: false
    });
    this.timer = setInterval(this.tick, 50);
    this.props.saveStartGameTime(new Date());
  };

  tick = () => {
    this.setState({
      elapsed: new Date() - new Date(this.props.startGameTime)
    });
  };

  onFinishGame = () => {
    this.props.clearStorage();
    clearInterval(this.timer);
    this.setState({ elapsed: 0, cookieDisabled: true });
  };

  render() {
    let pointGainSpeed = 0;
    let seconds = 0;

    if (this.state.elapsed) {
      let elapsed = Math.round(this.state.elapsed / 100);
      seconds = (elapsed / 10).toFixed(1);
      pointGainSpeed = (seconds ? this.props.points / seconds : 0).toFixed(1);
    }
    // I'm not sure if update global state that often is good idea - will testing.
    this.props.updateAvarageClickTime(pointGainSpeed);
    // if (seconds > 0 && seconds % 10 === 0) {
    //   this.props.updateAvarageClickTime(this.props.points / seconds);
    // }

    return (
      <div className="cookie">
        <span className="timer">{seconds}</span>
        <button
          disabled={!this.state.cookieDisabled}
          onClick={this.onStartGame}
          className="btn btn-success"
        >
          Start Game
        </button>
        <button onClick={this.onFinishGame} className="btn btn-danger">
          Finish Game
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
    clickValue: state.clickValue,
    startGameTime: state.startGameTime
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncreasePoints: clickValue =>
      dispatch({ type: actionTypes.INCREASE_POINTS, clickValue }),
    updateAvarageClickTime: avarageClickTime =>
      dispatch({
        type: actionTypes.UPDATE_AVARAGE_CLICK_TIME,
        avarageClickTime
      }),
    saveStartGameTime: startGameTime =>
      dispatch({ type: actionTypes.SAVE_START_GAME_TIME, startGameTime }),
    clearStorage: () => dispatch({ type: actionTypes.CLEAR_STORAGE })
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cookie);
