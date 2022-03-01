import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import coinReducer from "./reducers/coinReducer";

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
export const store = createStore(coinReducer, composeEnhancers(applyMiddleware(thunk)));
