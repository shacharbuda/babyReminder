import babyReducer from './reducer';
import { Baby } from '../interfaces';
import babiesJSON from '../resources/babies.json'
import util from '../utils/util';
import { ACTION_TYPES, addReminder, removeReminder, addBaby, removeBaby } from './actions';

describe('reducer.ts', () => {
	let babiesWithReminders;
	const PRE_SEEN_REMIDNER = 2;
	const EXIST_BABY = 0;

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

	it('should just one babyReminder', () => {
		const babyId = 0;
		const reminderId = PRE_SEEN_REMIDNER;

		const actual = babyReducer(babiesWithReminders, addReminder({babyId, reminderId}))

		expect(actual[babyId].seenReminders).toEqual([PRE_SEEN_REMIDNER]);
	});

	it('should remove babyReminder', () => {
		const babyId = 0;
		const reminderId = PRE_SEEN_REMIDNER;

		const actual = babyReducer(babiesWithReminders, removeReminder({babyId, reminderId}))

		expect(actual[babyId].seenReminders).toEqual([]);
	});

	it('should add new baby', () => {
		const newBaby: Baby = {
			name: 'new-baby-name',
			birthdate: new Date(),
			comments: 'comment',
			garden: 'my-garden',
			seenReminders: []
		};

		const actual = babyReducer(babiesWithReminders, addBaby(newBaby))

		expect(actual).toEqual([...babiesWithReminders, newBaby]);
	});

	it('should remove baby', () => {
		const babyIdToRemove = 0;

		const actual = babyReducer(babiesWithReminders, removeBaby(babyIdToRemove));
		const EXPECTED = babiesWithReminders.filter((elm, babyId) => babyId !== babyIdToRemove);

		expect(actual).toEqual(EXPECTED);
	});
})