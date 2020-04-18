export const IS_DEV = process.env.NODE_ENV !== 'production'
                    || process.env.PUBLIC_URL.includes('dev');

export const COLLECTIONS = {
	BABIES: 'babies',
  REMINDERS: 'reminders',
  USERS: 'users'
};

export  default {
	APP_VERSION: process.env.REACT_APP_VERSION,
	IS_DEV,
	COLLECTIONS
}