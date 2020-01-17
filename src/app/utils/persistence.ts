import { Baby, Reminder } from "../interfaces"
import util from './util';
import babiesJSON from '../resources/babies.json'
import remindersJSON from '../resources/reminders.json'

export const PERSISTENCE_CODES = {
	BABIES: 'BABIES',
	REMINDERS: 'REMINDERS',
	VERSION: 'VERSION'
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

function validateVersion() {
	// New version alert
	const serverVersion = process.env.REACT_APP_VERSION; 
	const userVersion = localStorage.getItem(PERSISTENCE_CODES.VERSION);
	if (!userVersion || userVersion !== serverVersion) {
		localStorage.setItem(PERSISTENCE_CODES.VERSION, serverVersion as string);

		alert('שימי לב! עודכנה גרסה חדשה. כדי לוודא שכל הנתונים עודכנו, בדקי עם המפתח');
	}
}

function validateUser() {
	// Password protection (only if data doesn't exsists)
	var person = prompt("שם משתמש:", "");
	if (person !== "אורי") {
		alert('אין לך גישה לאפליקציה. \nרענן לניסיון נוסף');
		throw new Error('User unrecognized. Validation failed.');
	} else {
		alert('ברוכה הבאה! להבא לא תצטרכי להקיש הסיסמה :)')
	}
}

function initData() {
	const isDataExists = !!localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (isDataExists) return;

	try {
		validateUser();

		const babiesWithReminders = babiesJSON.map(b => ({
			name: b.name + ' ' + b.lastName,
			birthdate: b.birthdate ? util.stringToDate(b.birthdate) : null,
			garden: b.garden,
			comments: b.comments,
			seenReminders: []
		}));

		localStorage.setObj(PERSISTENCE_CODES.REMINDERS, remindersJSON);
		localStorage.setObj(PERSISTENCE_CODES.BABIES, babiesWithReminders);
	} catch(e) {
		console.error('Error in initData(): ', e);
	}
}

function getReminders(): Reminder[] {
	const reminders: any[] = localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (!reminders || !reminders.length) return [];

	return reminders.map((r, id) => ({...r, id}))
}

function getBabies(): Baby[] {
	const babies: any[] = localStorage.getObj(PERSISTENCE_CODES.BABIES);
	
	if (!babies || !babies.length) return [];
	
	return babies.map((b) => ({...b, birthdate: new Date(b.birthdate)}));
}

function saveBabies(babies: Baby[]) {
	localStorage.setObj(PERSISTENCE_CODES.BABIES, babies);
}

export default {
	initData,
	getBabies,
	saveBabies,
	getReminders,
	validateVersion,
	persistence: localStorage
};