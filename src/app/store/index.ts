import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import loadingReducer from "./reducer";
import persistence from "../utils/persistence";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';

const middlewares = [
	// Thunk brings getFirestore and getFirebase to each thunk action creator
	thunk.withExtraArgument({ getFirestore, getFirebase })
];

if (process.env.NODE_ENV === `development`) {
	const { createLogger } = require(`redux-logger`);

	// Make sure reduxFirestore updates remain collpased as it contains many unused data..
	const logger = createLogger({
		collapsed: (getState, action) => action.type.startsWith('@@reduxFirestore')
	});

	middlewares.push(logger);
}

const reducer = combineReducers({
	loading: loadingReducer,
	firestore: firestoreReducer,
})

persistence.handleVersion();

const storeEnhancers = compose(
	applyMiddleware(...middlewares),
	reduxFirestore(firebase),
)

const store = createStore(reducer, {}, storeEnhancers);

export default store;