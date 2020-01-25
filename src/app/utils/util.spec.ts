import util from './util';
import { Reminder } from '../interfaces';
window.alert =  jest.fn();

describe('getBabyNextReminder', () => {
	// Disable Not implemented: window.alert Error
	// window.alert = () => {};

	const reminders: Reminder[] = [
		{
			id: 1,
			name: "זחילה",
			months: 3
		},
		{
			id: 2,
			name: "הליכה",
			months: 6
		},
		{
			id: 3,
			name: "ריצה",
			months: 12
		}
	];
	it('should return first reminder for age 0', () => {
		const EXPECTED = reminders[0];

		const age = 0;
		const seenReminders = [];
		const actual = util.getBabyNextReminder(age, seenReminders, reminders);
		expect(actual).toEqual<Reminder>(EXPECTED);

	})
})