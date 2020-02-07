import { createStore, combineReducers, applyMiddleware } from "redux";
import babyReducer from "./reducer";
import persistence from "../utils/persistence";

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const { logger } = require(`redux-logger`);

  middlewares.push(logger);
}

const reducer = combineReducers({
	baby: babyReducer,
	// boilerplate for real reminder reducer
	reminder: (state = []) => state 
})

persistence.handleVersion();
// Init data from temp mock files to persistance which will be stored in store later just below.
persistence.initData();

const persistedState = {
	baby: persistence.getBabies(),
	reminder: persistence.getReminders()
};

const store = createStore(reducer, persistedState, applyMiddleware(...middlewares));

// Persist baby changes for local device.
store.subscribe(() => {
	persistence.saveBabies(store.getState().baby);
})

export default store;