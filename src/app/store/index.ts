import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import loadingReducer from "./reducer";
import persistence from "../utils/persistence";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { getFirebase } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';
import getReduxLogger from "./logger";

const middlewares = [
	// Thunk brings getFirestore and getFirebase to each thunk action creator
	thunk.withExtraArgument({ getFirestore, getFirebase })
];

if (process.env.NODE_ENV === `development`) {
	middlewares.push(getReduxLogger());
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