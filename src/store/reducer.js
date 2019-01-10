const initialState = {
  points: 0,
  level: 0,
  nextLevelStep: 10,
  avarageClickTime: 0,
  maxAvarageClickTime: 0,
  clickValue: 1,
  clickerActive: false,
  morePointPerClickActive: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_POINTS":
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
    case "UPDATE_LEVEL":
      const nexlvl = state.level + 1;
      return {
        ...state,
        level: nexlvl,
        nextLevelStep: state.nextLevelStep * 2,
        clickerActive: nexlvl % 5 === 0
      };
    case "UPDATE_AVARAGE_CLICK_TIME":
      if (action.avarageClickTime > state.maxAvarageClickTime) {
        state.maxAvarageClickTime = action.avarageClickTime;
      }
      return {
        ...state,
        avarageClickTime: action.avarageClickTime
      };
    case "LOCK_BONUS":
      return {
        ...state,
        [action.name]: false
      };
    case "INCREASE_CLICK_VALUE":
      return {
        ...state,
        clickValue: state.clickValue + 1,
        morePointPerClickActive: false
      };
    case "DECREASE_POINTS":
      return {
        ...state,
        points: state.points + action.pointsDec
      };
    default:
      return state;
  }
};

export default reducer;
