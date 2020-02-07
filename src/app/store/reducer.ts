import { Action } from 'redux';
import { ACTION_TYPES } from './actions';
import { Baby, BabyNew } from '../interfaces';
import _ from 'lodash';

const DEFAULT_STATE: Baby[] = [];

export default function babyReducer(state = DEFAULT_STATE, action: Action<string>): Baby[] {
	const { payload } = action as any;

	switch(action.type) {
		case (ACTION_TYPES.ADD_REMINDER): {
			// Only add if not exist yet
			if (state[payload.babyId].seenReminders.includes(payload.reminderId)) return state;
			return state.map((baby, i) => {
				if (baby.id !== payload.babyId) return baby;

				return {
					...baby,
					seenReminders: [...baby.seenReminders, payload.reminderId]
				};
			});
		}

		case (ACTION_TYPES.REMOVE_REMINDER): {
			return state.map((baby, i) => {
				if (baby.id !== payload.babyId) return baby;

				return {
					...baby,
					seenReminders: baby.seenReminders.filter((elm) => elm !== payload.reminderId)
				};
			});
		}

		case (ACTION_TYPES.ADD_BABY): {
			const newBabyId = state.length;
			const newBaby  = payload.newBaby as BabyNew;

			const newBabyWithId = {
				...newBaby,
				id: newBabyId
			}

			// Payload is new baby object
			return [...state, newBabyWithId];
		}
		case (ACTION_TYPES.REMOVE_BABY): {
			// Payload is baby id
			return state.filter((baby) => baby.id !== payload.babyId);
		}
		case (ACTION_TYPES.SORT_BABIES): {
			return _.orderBy(state, ['garden', 'name']);
		}
		default:
			return state;
	}	
}