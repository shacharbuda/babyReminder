import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/firebase-analytics'
import constants from '../app/utils/constants';
import createFbAnalytics from './fbAnalytics';
// TODO: implement auth
// import 'firebase/auth'

// No problem making it public, apiKey is just an id, not a secret key
let firebaseConfig;
if (constants.IS_DEV) {
	firebaseConfig = {
    apiKey: "AIzaSyA4I8XjTZ4yU5OmMTN_lrjTs7nmIG6Fr6I",
    authDomain: "adibaby-dev.firebaseapp.com",
    databaseURL: "https://adibaby-dev.firebaseio.com",
    projectId: "adibaby-dev",
    storageBucket: "adibaby-dev.appspot.com",
    messagingSenderId: "864184464261",
    appId: "1:864184464261:web:719e1496a05021ddcf4aec",
    measurementId: "G-8S7P3E257R"
	};
} else {
	firebaseConfig = {
		apiKey: "AIzaSyAmd1uPOVKDrZhNJLCzXGHm9amktO5Kq5o",
		authDomain: "adibaby-0.firebaseapp.com",
		databaseURL: "https://adibaby-0.firebaseio.com",
		projectId: "adibaby-0",
		storageBucket: "adibaby-0.appspot.com",
		messagingSenderId: "617595404517",
		appId: "1:617595404517:web:7264505de9a57c0dfed40c",
		measurementId: "G-WZXLXWPK27"
	};
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const analytics = createFbAnalytics(firebase);
export default firebase;