export const IS_DEV = process.env.NODE_ENV !== `production`;

export const COLLECTIONS = {
	BABIES: 'babies',
	REMINDERS: 'reminders'
};

export  default {
	APP_VERSION: process.env.REACT_APP_VERSION,
	IS_DEV,
	COLLECTIONS
}