import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-analytics'
import constants from '../app/utils/constants';
// TODO: implement auth
// import 'firebase/auth'

// No problem making it public, apiKey is just an id, not a secret key
const firebaseConfig = {
	apiKey: "AIzaSyAmd1uPOVKDrZhNJLCzXGHm9amktO5Kq5o",
	authDomain: "adibaby-0.firebaseapp.com",
	databaseURL: "https://adibaby-0.firebaseio.com",
	projectId: "adibaby-0",
	storageBucket: "adibaby-0.appspot.com",
	messagingSenderId: "617595404517",
	appId: "1:617595404517:web:7264505de9a57c0dfed40c",
	measurementId: "G-WZXLXWPK27"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

let analyticsVar;
if (constants.IS_DEV) {
	analyticsVar = (msg) => console.log(`Analytics event: ${msg}`)
} else {
	analyticsVar = firebase.analytics().logEvent;
}

export const analytics = analyticsVar;

export default firebase;