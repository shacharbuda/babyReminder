import { Action } from 'redux';
import { ACTION_TYPES } from './actions';
import { Baby } from '../interfaces';

const DEFAULT_STATE: Baby[] = [];

export default function babyReducer(state = DEFAULT_STATE, action: Action<string>) {
	const { payload} = action as any;
	switch(action.type) {
		// case (ACTION_TYPES.INIT_BABIES): {
		// 	return persistence.getBabies();
		// }
		case (ACTION_TYPES.ADD_REMINDER): {
			// Only add if not exist yet
			if (state[payload.babyId].seenReminders.includes(payload.reminderId)) return state;
			return state.map((elm, i) => {
				if (i !== payload.babyId) return elm;

				return {
					...elm,
					seenReminders: [...elm.seenReminders, payload.reminderId]
				};
			});
		}
		case (ACTION_TYPES.REMOVE_REMINDER): {
			return state.map((elm, i) => {
				if (i !== payload.babyId) return elm;

				return {
					...elm,
					seenReminders: elm.seenReminders.filter((elm) => elm !== payload.reminderId)
				};
			});
		}
		default:
			return state;
	}	
}