import { Action } from 'redux';
import { ACTION_TYPES } from './actions';

interface state {
	isLoading: boolean;
	isGlobal: boolean;
}

const DEFAULT_STATE: state = {isLoading: false, isGlobal: false};

export default function babyReducer(state = DEFAULT_STATE, action: Action<string>): state {
	const { payload } = action as any;

	switch(action.type) {
		case (ACTION_TYPES.SET_LOADING):
			console.log('loading...');
			return {
				isLoading: true,
				isGlobal: payload.isGlobal
			}
		case (ACTION_TYPES.SET_SUCCESS):
			console.log('success!')
			if (payload.msg) {
				console.log(payload.msg);
			}
			// For both success and error
			return DEFAULT_STATE;
		case (ACTION_TYPES.SET_ERROR):
			console.error('error!')
			if (payload.msg) {
				console.error(payload.msg);
			}
			// For both success and error
			return DEFAULT_STATE;
		default:
			return state;
	}	
}