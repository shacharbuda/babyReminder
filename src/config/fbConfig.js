import firebase from 'firebase/app'
import 'firebase/firestore'
// TODO: implement auth
// import 'firebase/auth'

// No problem making it public, apiKey is just an id, not a secret key
var firebaseConfig = {
	apiKey: "AIzaSyAmd1uPOVKDrZhNJLCzXGHm9amktO5Kq5o",
	authDomain: "adibaby-0.firebaseapp.com",
	databaseURL: "https://adibaby-0.firebaseio.com",
	projectId: "adibaby-0",
	storageBucket: "adibaby-0.appspot.com",
	messagingSenderId: "617595404517",
	appId: "1:617595404517:web:7264505de9a57c0dfed40c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


export default firebase;