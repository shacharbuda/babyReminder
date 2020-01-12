import { ActionCreator, Action, AnyAction } from 'redux';
import { Baby } from '../interfaces';

export const ACTION_TYPES = {
	INIT_BABIES: 'INIT_BABIES',
	ADD_REMINDER: 'ADD_REMINDER',
	REMOVE_REMINDER: 'REMOVE_REMIDNER'
};

export const initBabies: ActionCreator<Action> = () => ({
  type: ACTION_TYPES.INIT_BABIES
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