import React from "react";
import Modal from "react-modal";
import axios from "axios";
import config from "../config.json";
import { func, bool, number, shape, string } from "prop-types";

const BACKEND_URL = `${config.backend_url}/panteon`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

const inputNameRef = React.createRef();

const SaveScore = (evt, score, onClose) => {
  evt.preventDefault();
  score.nick = inputNameRef.current.value;
  axios.post(BACKEND_URL, { score }).catch(err => alert(err));
  onClose();
};

const SaveScoreModal = ({ isOpen, onClose, onSave, score }) => (
  <Modal isOpen={isOpen} style={customStyles}>
    <button
      type="button"
      className="close"
      aria-label="Close"
      onClick={onClose}
    >
      <span aria-hidden="true">&times;</span>
    </button>

    <h3>Save your score</h3>
    <form onSubmit={evt => SaveScore(evt, score, onSave)}>
      <p>Type your nick:</p>
      <input ref={inputNameRef} />
      <button type="submit">Save</button>
    </form>
  </Modal>
);

SaveScoreModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  onSave: func.isRequired,
  score: shape({
    level: string,
    points: number,
    avgPointsGainedOnFinish: number,
    bestAvgPoinsGainedTime: number
  }).isRequired
};

export default SaveScoreModal;
