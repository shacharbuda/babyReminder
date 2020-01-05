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

	const babiesWithReminders = babiesJSON.map(b => ({
		name: b.name,
		birthdate: util.stringToDate(b.birthdate),
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

export default {
	initData,
	getBabies,
	getReminders,
	persistence: localStorage
};