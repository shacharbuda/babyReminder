import logger from 'redux-logger';
import { createStore, combineReducers, applyMiddleware } from "redux";
import babyReducer from "./reducer";
import persistence from "../utils/persistence";

const reducer = combineReducers({
	baby: babyReducer,
	// boilerplate for real reminder reducer
	reminder: (state = []) => state 
})

const persistedState = {
	baby: persistence.getBabies(),
	reminder: persistence.getReminders()
};

const store = createStore(reducer, persistedState, applyMiddleware(logger));

store.subscribe(() => {
	persistence.saveBabies(store.getState().baby);
})

export default store;