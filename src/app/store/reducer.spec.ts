import babyReducer from './reducer';
import { Baby, BabyNew } from '../interfaces';
import babiesJSON from '../resources/babies.json'
import util from '../utils/util';
import { addReminder, removeReminder, addBaby, removeBaby } from './actions';
import _ from 'lodash';

describe('reducer.ts', () => {
	let babiesWithReminders: Baby[];
	const PRE_SEEN_REMIDNER = 2;
	const EXIST_BABY = 0;
	const getBabyById = (babies: Baby[], id: number): Baby => _.find(babies, b => b.id === id);

	beforeEach(() => {
		babiesWithReminders = (babiesJSON as Baby[]).map((b, index) => ({
			...b,
			name: b.name + ' ' + (b as any).lastName,
			id: index,
			birthdate: util.stringToDate(b.birthdate as any),
			seenReminders: [PRE_SEEN_REMIDNER],
		}));

	})

	it('should add babyReminder', () => {
		const babyId = 0;
		const reminderId = 1;

		const actual = babyReducer(babiesWithReminders, addReminder({babyId, reminderId}))
		const actualBaby = getBabyById(actual, babyId);

		expect(actualBaby.seenReminders).toEqual([PRE_SEEN_REMIDNER, reminderId]);
	});

	it('should change nothing on adding same reminder', () => {
		const babyId = 0;
		const reminderId = PRE_SEEN_REMIDNER;

		const actual = babyReducer(babiesWithReminders, addReminder({babyId, reminderId}))
		const actualBaby = getBabyById(actual, babyId);

		expect(actualBaby.seenReminders).toEqual([PRE_SEEN_REMIDNER]);
	});

	it('should remove babyReminder', () => {
		const babyId = 0;
		const reminderId = PRE_SEEN_REMIDNER;

		const actual = babyReducer(babiesWithReminders, removeReminder({babyId, reminderId}))
		const actualBaby = getBabyById(actual, babyId);

		expect(actualBaby.seenReminders).toEqual([]);
	});

	it('should add new baby', () => {
		const newId = babiesWithReminders.length;

		const newBaby: BabyNew = {
			name: 'new-baby-name',
			birthdate: new Date(),
			comments: 'comment',
			garden: 'my-garden',
			seenReminders: []
		};

		const EXPECTED_NEW_BABY: Baby = {
			...newBaby,
			id: newId
		};

		const actual = babyReducer(babiesWithReminders, addBaby(newBaby));

		expect(actual).toEqual([...babiesWithReminders, EXPECTED_NEW_BABY]);
	});

	it('should remove baby', () => {
		const babyIdToRemove = 0;

		const actual = babyReducer(babiesWithReminders, removeBaby(babyIdToRemove));
		const EXPECTED = babiesWithReminders.filter((baby) => baby.id !== babyIdToRemove);

		expect(actual).toEqual(EXPECTED);
	});
})