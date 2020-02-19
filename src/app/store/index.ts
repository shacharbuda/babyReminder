import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import babyReducer from "./reducer";
import persistence from "../utils/persistence";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';

const middlewares = [
	// Thunk brings getFirestore and getFirebase to each thunk action creator
	thunk.withExtraArgument({ getFirestore, getFirebase })
];

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

const storeEnhancers = compose(
	applyMiddleware(...middlewares),
	reduxFirestore(firebase),
)

const store = createStore(reducer, {}, storeEnhancers);

export default store;