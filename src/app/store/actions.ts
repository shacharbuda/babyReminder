import { ActionCreator, Action } from 'redux';
import { Baby } from '../interfaces';

export const ACTION_TYPES = {
	INIT_BABIES: 'INIT_BABIES',
	ADD_REMINDER: 'ADD_REMINDER',
	REMOVE_REMINDER: 'REMOVE_REMIDNER',
	ADD_BABY: 'ADD_BABY',
	REMOVE_BABY: 'REMOVE_BABY'
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

export const removeBaby: ActionCreator<Action> = (babyId: number) => ({
	type: ACTION_TYPES.REMOVE_BABY,
	payload: {
		babyId
	}
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