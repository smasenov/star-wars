import { configureStore, Store } from '@reduxjs/toolkit';

import reducer from './reducers/index';

interface RootState {
	// Define your root state properties here
}

const store: Store<RootState> = configureStore({
	reducer,
});

export { store }