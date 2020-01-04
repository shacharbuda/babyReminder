import { Baby, Reminder } from "../interfaces"

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
	// MOCK data
	const reminders = [
		{
			name: 'הליכה',
			months: 2
		},
		{
			name: 'ריצה',
			months: 10
		}
	];

	const babies = [
		{
			name: 'מוטי',
			// 1 jan 2019
			birthdate: new Date(2019, 0, 1)
		},
		{
			name: 'יוסי',
			// 1 sep 2019
			birthdate: new Date(2019, 8, 1),
		},
		{
			name: 'שמוליק',
			// 1 dec 2019
			birthdate: new Date(2019, 11, 1),
		}		
	];

	const babiesWithReminders = babies.map(b => ({...b, seenReminders: []}));

	localStorage.setObj(PERSISTENCE_CODES.REMINDERS, reminders);
	localStorage.setObj(PERSISTENCE_CODES.BABIES, babiesWithReminders);
}

{
	const isDataExists = !!localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (!isDataExists) {
		initData();
	}
}

export function getReminders(): Reminder[] {
	const reminders: any[] = localStorage.getObj(PERSISTENCE_CODES.REMINDERS);

	if (!reminders || !reminders.length) return [];

	return reminders.map((r, id) => ({...r, id}))
}

export function getBabies(): Baby[] {
	const babies: any[] = localStorage.getObj(PERSISTENCE_CODES.BABIES);
	
	if (!babies || !babies.length) return [];
	
	return babies.map((b) => ({...b, birthdate: new Date(b.birthdate)}));
}

export default localStorage;