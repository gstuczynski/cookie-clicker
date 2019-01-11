import * as actionTypes from "./actionTypes";

const initialState = {
  points: 0,
  level: 0,
  nextLevelStep: 10,
  avarageClickTime: 0,
  maxAvarageClickTime: 0,
  clickValue: 1,
  clickerActive: false,
  morePointPerClickActive: false,
  startGameTime: null,
  permanentClickerValue: 0
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INCREASE_POINTS:
      if ((state.points + 1) % 100 === 0 && state.points > 0) {
        state.morePointPerClickActive = true;
      }
      if (state.points + 1 >= state.nextLevelStep) {
        state.level++;
        state.nextLevelStep = state.nextLevelStep * 2;
        state.clickerActive = (state.level + 1) % 5 === 0;
      }
      return {
        ...state,
        points: state.points + (action.clickValue || 1)
      };
    case actionTypes.UPDATE_AVARAGE_CLICK_TIME:
      if (action.avarageClickTime > state.maxAvarageClickTime) {
        state.maxAvarageClickTime = action.avarageClickTime;
      }
      return {
        ...state,
        avarageClickTime: action.avarageClickTime
      };
    case actionTypes.LOCK_BONUS:
      return {
        ...state,
        [action.name]: false
      };
    case actionTypes.INCREASE_CLICK_VALUE:
      return {
        ...state,
        clickValue: state.clickValue + 1,
        morePointPerClickActive: false
      };
    case actionTypes.DECREASE_POINTS:
      return {
        ...state,
        points: state.points - action.pointsDec
      };
    case actionTypes.SAVE_START_GAME_TIME:
      return {
        ...state,
        startGameTime: action.startGameTime
      };
    case actionTypes.INCREASE_PERMANENT_CLICKER_VALUE:
      return {
        ...state,
        permanentClickerValue: state.permanentClickerValue + 1
      };
    case actionTypes.CLEAR_STORAGE:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
