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

// TODO: remove this on v0.2 !
// Patch for v0.1.2 - add id to each baby and reminder
if (persistedState.baby[0] && !persistedState.baby[0].id) {
	persistedState.baby = persistedState.baby.map((b, index) => {
		const newBaby = {...b};
		newBaby.id = index;

		return newBaby;
	});
}
if (persistedState.reminder[0] && !persistedState.reminder[0].id) {
	persistedState.reminder = persistedState.reminder.map((b, index) => {
		const newReminder = {...b};
		newReminder.id = index;

		return newReminder;
	});
}

const store = createStore(reducer, persistedState, applyMiddleware(...middlewares));

// Persist baby changes for local device.
store.subscribe(() => {
	persistence.saveBabies(store.getState().baby);
})

export default store;