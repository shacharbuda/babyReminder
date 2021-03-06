import util from './util';
import { Reminder, ReminderRef } from '../interfaces';
import _ from 'lodash';
window.alert =  jest.fn();

describe('getBabyNextReminder', () => {
	const reminders: Reminder[] = [
		{
			id: '1',
			name: "זחילה",
			months: 3
		},
		{
			id: '2',
			name: "הליכה",
			months: 6
		},
		{
			id: '3',
			name: "ריצה",
			months: 12
		}
	];

	const getReminderById = (id: string) => _.find(reminders, r => r.id === id);

	it('should return first reminder as no reminders seen', () => {
		const EXPECTED = getReminderById('1');

		const seenReminders = [];
		const actual = util.getBabyNextReminder(seenReminders, reminders);
		expect(actual).toEqual<Reminder>(EXPECTED);
	});

	it('should return second reminder as first reminder seen', () => {
		const EXPECTED = getReminderById('2');

		const seenReminders = [{id: '1'}];
		const actual = util.getBabyNextReminder(seenReminders as ReminderRef[], reminders);
		expect(actual).toEqual<Reminder>(EXPECTED);
	});

	it('should return no reminder as all reminders seen', () => {
		const seenReminders = [1, 2, 3];
		const seenRemindersRef = seenReminders.map(r => ({id: r.toString()}));
		const actual = util.getBabyNextReminder(seenRemindersRef as ReminderRef[], reminders);
		expect(actual).toBeUndefined();
	});
})