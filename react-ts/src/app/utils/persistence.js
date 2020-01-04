export const LOCAL_STORAGE_CODES = {
	BABIES: 'BABIES',
	REMINDERS: 'REMINDERS'
}

Storage.prototype.setObj = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
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

	localStorage.setObj(LOCAL_STORAGE_CODES.REMINDERS, reminders);
	localStorage.setObj(LOCAL_STORAGE_CODES.BABIES, babiesWithReminders);
}

export default function persistence() {
	const isDataExists = !!localStorage.getObj(LOCAL_STORAGE_CODES.REMINDERS);

	if (!isDataExists) {
		initData();
	}
}