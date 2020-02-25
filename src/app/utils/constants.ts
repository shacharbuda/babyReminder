export const EDIT_FORM_URL = 'editBabyReminder.html';
export const HOME_URL = 'index.html';
export const IS_DEV = process.env.NODE_ENV !== `production`;

export const COLLECTIONS = {
	BABIES: 'babies',
	REMINDERS: 'reminders'
};

export  default {
	APP_VERSION: process.env.REACT_APP_VERSION,
	VALID_USERNAME: 'אורי',
	IS_DEV,
	COLLECTIONS
}