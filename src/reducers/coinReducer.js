import { UPDATE_STORE } from "../actions";

const INITIAL_STATE = {
  crypto: ["fssdffds"],
};

export const coinReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STORE:
      return {
        ...state, crypto: action.payload,
      };
    default:
      return state;
  }
};

export default coinReducer;
