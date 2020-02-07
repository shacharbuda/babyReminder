import { Baby, Reminder } from "../interfaces"
import util from './util';
import babiesJSON from '../resources/babies.json'
import remindersJSON from '../resources/reminders.json'
import consts from './constants';

export const PERSISTENCE_CODES = {
	BABIES: 'BABIES',
	REMINDERS: 'REMINDERS',
	VERSION: 'VERSION',
	USER_NAME: 'USER_NAME'
}

Storage.prototype.setObj = function(key: string, obj: Reminder | Baby) {
	return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key: string) {
	try {
		return JSON.parse(this.getItem(key) as string);
	}  catch(e) {
		// getItem didn't return string
		return null;
	}
}

function handleVersion() {
	if (isNewVersion()) {
		alert('גרסה חדשה!');

		updateVersion();
	}
}

function isNewVersion() {
	// New version alert
	const serverVersion = consts.APP_VERSION; 
	const userVersion = localStorage.getItem(PERSISTENCE_CODES.VERSION);
	return (!userVersion || userVersion !== serverVersion);
}

function updateVersion() {
	const serverVersion = consts.APP_VERSION;
	localStorage.setItem(PERSISTENCE_CODES.VERSION, serverVersion as string);
}

function isUserLoggedIn() {
	return !!localStorage.getItem(PERSISTENCE_CODES.USER_NAME);
}

function validateUser() {
	if (isUserLoggedIn()) return;

	// Password protection (only if user doesn't exsists)
	const userInput = prompt("שם משתמש:", "");
	if (userInput !== consts.VALID_USERNAME) {
		alert('אין לך גישה לאפליקציה. \nרענן לניסיון נוסף');
		throw new Error('User unrecognized. Validation failed.');
	} else {
		alert('ברוכה הבאה! להבא לא תצטרכי להקיש הסיסמה :)');
		localStorage.setItem(PERSISTENCE_CODES.USER_NAME, userInput)
	}
}

function initData() {
	const isDataExists = !!localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (isDataExists) return;

	validateUser();

	try {
		const babiesWithReminders = babiesJSON.map((b, id) => ({
			id,
			name: b.name + ' ' + b.lastName,
			birthdate: b.birthdate ? util.stringToDate(b.birthdate) : null,
			garden: b.garden,
			comments: b.comments,
			seenReminders: []
		}));

		const remindersWithId = remindersJSON.map((r, id) => ({
			...r,
			id
		}));

		localStorage.setObj(PERSISTENCE_CODES.REMINDERS, remindersWithId);
		localStorage.setObj(PERSISTENCE_CODES.BABIES, babiesWithReminders);
	} catch(e) {
		console.error('Error in initData(): ', e);
	}
}

function getReminders(): Reminder[] {
	const reminders: any[] = localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (!reminders || !reminders.length) return [];

	return reminders;
}

function getBabies(): Baby[] {
	const babies: any[] = localStorage.getObj(PERSISTENCE_CODES.BABIES);
	
	if (!babies || !babies.length) return [];
	
	return babies.map((b) => ({...b, name: b.name.trim(), birthdate: new Date(b.birthdate)}));
}

function saveBabies(babies: Baby[]) {
	localStorage.setObj(PERSISTENCE_CODES.BABIES, babies);
}

export default {
	initData,
	getBabies,
	saveBabies,
	getReminders,
	isNewVersion,
	updateVersion,
	handleVersion,
	isUserLoggedIn,
	persistence: localStorage
};