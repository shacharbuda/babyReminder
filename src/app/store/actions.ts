import { ActionCreator, Action } from 'redux';
import { Baby } from '../interfaces';

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

export const addBaby: ActionCreator<Action> = (newBaby: Baby) => ({
	type: ACTION_TYPES.ADD_BABY,
	payload: {
		newBaby
	}
});

export const removeBaby = (babyId: number) => async (dispatch) => {
	// asyc can happen here
	const p = new Promise((res) => {
		setTimeout(() => {
			res();
		}, 1000);
	});
	console.log('before');
	await p;
	console.log('after');
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