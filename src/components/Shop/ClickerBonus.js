import React from "react";
import { bool, number, func, string } from "prop-types";
import locked from "../../assets/locked.png";
import unlocked from "../../assets/unlocked.png";

const ClickerBonus = ({ active, text, onClick, cost }) => (
  <button disabled={!active} onClick={onClick} className="btn btn-primary">
    {!active ? (
      <img src={locked} alt="locked" />
    ) : (
      <img src={unlocked} alt="unlocked" />
    )}
    {text}
    <span style={{ color: "red" }}>Cost {cost}</span>
  </button>
);

ClickerBonus.propTypes = {
  active: bool,
  timeLeft: number,
  value: number,
  onClick: func,
  cost: number,
  text: string
};

export default ClickerBonus;
