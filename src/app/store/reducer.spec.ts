import babyReducer from './reducer';
import { Baby } from '../interfaces';
import persistence from '../utils/persistence';
import babiesJSON from '../resources/babies.json'
import util from '../utils/util';
import { ACTION_TYPES, addReminder, removeReminder } from './actions';

describe('reducer.ts', () => {
	let babiesWithReminders;
	const PRE_SEEN_REMIDNER = 2;

	beforeAll(() => {
		babiesWithReminders = babiesJSON.map(b => ({
			name: b.name,
			birthdate: util.stringToDate(b.birthdate),
			seenReminders: [PRE_SEEN_REMIDNER]
		}));
	})

	it('should add babyReminder', () => {
		const babyId = 0;
		const reminderId = 1;

		const actual = babyReducer(babiesWithReminders, addReminder({babyId, reminderId}))

		expect(actual[babyId].seenReminders).toEqual([PRE_SEEN_REMIDNER, reminderId]);
	});

	it('should remove babyReminder', () => {
		const babyId = 0;
		const reminderId = PRE_SEEN_REMIDNER;

		const actual = babyReducer(babiesWithReminders, removeReminder({babyId, reminderId}))

		expect(actual[babyId].seenReminders).toEqual([]);
	});
})