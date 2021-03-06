import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import loadingReducer from "./reducer";
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore, firestoreReducer } from 'redux-firestore';
import { getFirebase, firebaseReducer } from 'react-redux-firebase';
import firebase from '../../config/fbConfig';
import getReduxLogger from "./logger";
import constants from "../utils/constants";

const middlewares = [
	// Thunk brings getFirestore and getFirebase to each thunk action creator
	thunk.withExtraArgument({ getFirestore, getFirebase })
];

if (constants.IS_DEV) {
	middlewares.push(getReduxLogger());
}

const reducer = combineReducers({
	loading: loadingReducer,
	firestore: firestoreReducer,
	firebase: firebaseReducer
})

const storeEnhancers = compose(
	applyMiddleware(...middlewares),
	reduxFirestore(firebase),
)

const store = createStore(reducer, {}, storeEnhancers);

export default store;