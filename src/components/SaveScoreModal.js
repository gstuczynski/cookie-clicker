import React from "react";
import Modal from "react-modal";
import axios from "axios";
import { func, bool, number, shape } from "prop-types";
import { string } from "postcss-selector-parser";

const BACKEND_URL = "http://localhost:3001/save-score";

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

const SaveScoreModal = ({ isOpen, onClose, score }) => (
  <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
    <h2>Hello</h2>
    <button onClick={onClose}>close</button>
    <div>I am a modal</div>
    <form onSubmit={evt => SaveScore(evt, score, onClose)}>
      <input ref={inputNameRef} />
      <button type="submit">Save</button>
    </form>
  </Modal>
);

SaveScoreModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired,
  score: shape({
    level: string,
    points: number,
    avgPointsGainedOnFinish: number,
    bestAvgPoinsGainedTime: number
  }).isRequired
};

export default SaveScoreModal;
