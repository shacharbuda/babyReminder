import { Baby, Reminder } from "../interfaces"
import util from './util';
import babiesJSON from '../resources/babies.json'
import remindersJSON from '../resources/reminders.json'

export const PERSISTENCE_CODES = {
	BABIES: 'BABIES',
	REMINDERS: 'REMINDERS'
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

function initData() {
	const isDataExists = !!localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (isDataExists) return;

	// Password protection (only if data doesn't exsists)
	var person = prompt("שם משתמש:", "");
	if (person !== "אורי") {
		alert('אין לך גישה לאפליקציה. \nרענן לניסיון נוסף');
		return;
	} else {
		alert('ברוכה הבאה! להבא לא תצטרכי להקיש הסיסמה :)')
	}

	const babiesWithReminders = babiesJSON.map(b => ({
		name: b.name + ' ' + b.lastName,
		birthdate: b.birthdate ? util.stringToDate(b.birthdate) : null,
		garden: b.garden,
		comments: b.comments,
		seenReminders: []
	}));

	localStorage.setObj(PERSISTENCE_CODES.REMINDERS, remindersJSON);
	localStorage.setObj(PERSISTENCE_CODES.BABIES, babiesWithReminders);
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
	persistence: localStorage
};