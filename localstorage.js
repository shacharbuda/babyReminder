Storage.prototype.setObj = function(key, obj) {
	return this.setItem(key, JSON.stringify(obj))
}

Storage.prototype.getObj = function(key) {
	return JSON.parse(this.getItem(key))
}

	{
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
			birthdate: new Date(2019, 0, 1),
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

	const babyReminders = babies.map((b, i) => ({
			babyId: i,
			seenRemindersId: []
	}));

	if (localStorage.getObj('reminders')) console.log('localStorage is already there. won\'t set new');
	localStorage.setObj('reminders', reminders);
	localStorage.setObj('babies', babies);
	localStorage.setObj('babyReminders', babyReminders)
}