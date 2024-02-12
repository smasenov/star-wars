import { detailsStates } from '../states';
import {
	Action, FetchDetailsStartAction, FetchDetailsSuccessAction, FetchDetailsFailAction,
	FETCH_DETAILS_START, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAIL
} from '../actions/actionTypes'; // Assuming Action type is defined in '../actions/actionTypes'

// Define the initial state
interface StateObject {
	[key: string]: {
		data: any; // Adjust the type according to your data type
		loading: boolean;
		error: any; // Adjust the type according to your error type
	};
}

const initialState: StateObject = detailsStates.reduce((state, stateName) => ({
	...state,
	[stateName]: { data: null, loading: false, error: null }
}), {});

// Define action creators
const fetchDetailsStart = (state: StateObject, action: FetchDetailsStartAction): StateObject => ({
	...state,
	[action.identifier]: { ...state[action.identifier], loading: true }
});

const fetchDetailsSuccess = (state: StateObject, action: FetchDetailsSuccessAction): StateObject => ({
	...state,
	[action.identifier]: { ...state[action.identifier], data: action.data, loading: false, error: null }
});

const fetchDetailsFail = (state: StateObject, action: FetchDetailsFailAction): StateObject => ({
	...state,
	[action.identifier]: { ...state[action.identifier], data: null, loading: false, error: action.error }
});

// Define the reducer
const reducer = (state: StateObject = initialState, action: Action): StateObject => {
	switch (action.type) {
		case FETCH_DETAILS_START:
			return fetchDetailsStart(state, action as FetchDetailsStartAction);
		case FETCH_DETAILS_SUCCESS:
			return fetchDetailsSuccess(state, action as FetchDetailsSuccessAction);
		case FETCH_DETAILS_FAIL:
			return fetchDetailsFail(state, action as FetchDetailsFailAction);
		default:
			return state;
	}
};

export default reducer;