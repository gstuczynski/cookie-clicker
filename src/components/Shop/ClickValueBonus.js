import React from "react";
import { bool, number, func } from "prop-types";
import locked from "../../assets/locked.png";
import unlocked from "../../assets/unlocked.png";

const ClickValueBonus = ({ active, value, onClick }) => (
  <button disabled={active} onClick={onClick} className="btn btn-primary">
    {active ? (
      <img src={locked} alt="locked" />
    ) : (
      <img src={unlocked} alt="unloacked" />
    )}
    Each click will be be worth {value + 1}
  </button>
);

ClickValueBonus.propTypes = {
  active: bool.isRequired,
  value: number.isRequired,
  onClick: func.isRequired
};

export default ClickValueBonus;
