import detailsReducer from './details';
import { combineReducers, Reducer } from 'redux'; // Import combineReducers and Reducer types from Redux

// Define the root state type
export interface RootState {
	details: ReturnType<typeof detailsReducer>; // Infer the state type of detailsReducer
	// Add more properties here if needed
}

// Define the root reducer
const rootReducer: Reducer<RootState> = combineReducers({
	details: detailsReducer,
	// Add more reducers here if needed
});

export default rootReducer;