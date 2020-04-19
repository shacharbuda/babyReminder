import { BabyNew, BabyReminder, DBFunction } from '../interfaces';
import { COLLECTIONS } from '../utils/constants';
import { initMessaging } from '../../config/fbConfig';


export const ACTION_TYPES = {
	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',
  SET_SUCCESS: 'SET_SUCCESS',
  SEND_USER_DATA: 'SEND_USER_DATA'
};

// isGlobal can be used for spinner on root app.
const setLoading = (isGlobal = false) => ({
	type: ACTION_TYPES.SET_LOADING,
	payload: { isGlobal }
})

const setSuccess = (msg = null) => ({
	type: ACTION_TYPES.SET_SUCCESS,
	payload: { msg }
})

const setError = (err: string, msg = null) => ({
	type: ACTION_TYPES.SET_ERROR,
	payload: { err, msg }
})

const dbOperation = (dbFunction: DBFunction, successMsg?: string, errMsg?: string, isGlobal?: boolean) => async (dispatch, getState, { getFirebase, getFirestore }) => {
	try {
		dispatch(setLoading(isGlobal));
		await dbFunction(getFirestore(), getFirebase());
		dispatch(setSuccess(successMsg));
	} catch(e) {
		dispatch(setError(e, errMsg))
	}
}

export const addBaby = (newBaby: BabyNew) => {
	const dbFunction: DBFunction = async (firestore, firebase) => {
		const { uid } = firebase.auth().currentUser;
		await firestore.collection(COLLECTIONS.BABIES).add({
			...newBaby,
			uid
		});
	}
	const successMsg = "Added baby successfuly!";
	const errMsg = "Error adding baby...";
	const isGlobal = true;

	return dbOperation(dbFunction, successMsg, errMsg, isGlobal);
};

export const removeBaby = (babyId: string) => {
	const dbFunction: DBFunction = async (firestore) => {
		await firestore.collection(COLLECTIONS.BABIES).doc(babyId).delete();
	}
	return dbOperation(dbFunction);
}

export const addReminder = (payload: BabyReminder) => {
	const dbFunction: DBFunction = async (firestore, firebase) => {
		const babyRef = firestore.collection(COLLECTIONS.BABIES).doc(payload.babyId);
		// TODO: just get ref as prop, not id... for both baby and reminder	
		const newReminderRef = firestore.doc(`${COLLECTIONS.REMINDERS}/${payload.reminderId}`);
		await babyRef.update({
			// @ts-ignore
			seenReminders: firebase.firestore.FieldValue.arrayUnion(newReminderRef)
		});
	}
	const successMsg = "Added reminder successfuly!";
	const errMsg = "Error adding reminder...";
	const isGlobal = true;

	return dbOperation(dbFunction, successMsg, errMsg, isGlobal);
};

export const removeReminder = (payload: BabyReminder) => {
	// TODO: implement
	console.log(`this should remove reminder ${payload.reminderId} from baby ${payload.babyId}`);
	// type: ACTION_TYPES.REMOVE_REMINDER,
	// payload
};

export const sendUserData = () => {
  // TODO: update token on tokenRefresh
  const dbFunction: DBFunction = async (firestore, firebase) => {
    const { uid, displayName, email } = firebase.auth().currentUser;
    const token = await initMessaging();

    if (!token) throw new Error('No messaging token!');
    
    const userDataVal = {
      uid,
      token,
      displayName,
      email
    };

    // Update doc with value. make sure to update (create/set) for both cases (created or not).
    // Use uid as id
    await firestore.collection(COLLECTIONS.USERS).doc(uid).set(
      userDataVal,
    {
      merge: true
    });
  };
  
	return dbOperation(dbFunction);
}