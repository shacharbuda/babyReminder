import { BabyNew, BabyReminder } from '../interfaces';
import { FirebaseFirestore } from '@firebase/firestore-types'

type DBFunction = (firestore: FirebaseFirestore) => {};

export const ACTION_TYPES = {
	SET_LOADING: 'SET_LOADING',
	SET_ERROR: 'SET_ERROR',
	SET_SUCCESS: 'SET_SUCCESS'
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

const setError = (msg = null) => ({
	type: ACTION_TYPES.SET_ERROR,
	payload: { msg }
})

const dbOperation = (dbFunction: DBFunction, successMsg?: string, errMsg?: string, isGlobal?: boolean) => async (dispatch, getState, { getFirebase, getFirestore }) => {
	try {
		dispatch(setLoading(isGlobal));
		await dbFunction(getFirestore())
		dispatch(setSuccess(successMsg));
	} catch(e) {
		dispatch(setError(errMsg));
	}
}

export const addBaby = (newBaby: BabyNew) => {
	const dbFunction: DBFunction = async (firestore) => {
		await firestore.collection('babies').add({
			...newBaby
		});
	}
	const successMsg = "Added baby successfuly!";
	const errMsg = "Error adding baby...";
	const isGlobal = true;

	return dbOperation(dbFunction, successMsg, errMsg, isGlobal);
};

export const removeBaby = (babyId: string) => {
	const dbFunction: DBFunction = async (firestore) => {
		await firestore.collection('babies').doc(babyId).delete();
	}
	return dbOperation(dbFunction);
}

export const addReminder = (payload: BabyReminder) => {
	console.log(`this should add reminder ${payload.reminderId} to baby ${payload.babyId}`);
	// type: ACTION_TYPES.ADD_REMINDER,
	// payload
};

export const removeReminder = (payload: BabyReminder) => {
	console.log(`this should remove reminder ${payload.reminderId} from baby ${payload.babyId}`);
	// type: ACTION_TYPES.REMOVE_REMINDER,
	// payload
};