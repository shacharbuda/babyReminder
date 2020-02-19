import { ActionCreator, Action } from 'redux';
import { BabyNew } from '../interfaces';

export const ACTION_TYPES = {
	INIT_BABIES: 'INIT_BABIES',
	ADD_REMINDER: 'ADD_REMINDER',
	REMOVE_REMINDER: 'REMOVE_REMIDNER',
	ADD_BABY: 'ADD_BABY',
	REMOVE_BABY: 'REMOVE_BABY',
	SORT_BABIES: 'SORT_BABIES'
};

export const initBabies: ActionCreator<Action> = () => ({
  type: ACTION_TYPES.INIT_BABIES
});

export const addBaby = (newBaby: BabyNew) => async (dispatch, getState, { getFirebase, getFirestore }) => {
	try {

		const firestore = getFirestore();
		await firestore.collection('babies').add({
			...newBaby
		});
		console.log('success!');
		// dispatch({	
		// 	type: ACTION_TYPES.ADD_BABY,
		// 	payload: {
		// 		newBaby
		// 	}
		// });
	} catch(e) {
		console.error('e ? ', e);
	}
}

export const removeBaby = (babyId: number) => async (dispatch) => {
	dispatch({
		type: ACTION_TYPES.REMOVE_BABY,
		payload: {
			babyId
		}
	});
}

export const sortBabies: ActionCreator<Action> = () => ({
	type: ACTION_TYPES.SORT_BABIES
});

interface BabyReminder {
	babyId: number;
	reminderId: number;
}
export const addReminder = (payload: BabyReminder) => ({
	type: ACTION_TYPES.ADD_REMINDER,
	payload
});

export const removeReminder = (payload: BabyReminder) => ({
	type: ACTION_TYPES.REMOVE_REMINDER,
	payload
});