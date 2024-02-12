import axios from 'axios';
import { Dispatch } from 'redux';
import {
	BaseAction, FetchDetailsStartAction, FetchDetailsSuccessAction, FetchDetailsFailAction,
	FETCH_DETAILS_START, FETCH_DETAILS_SUCCESS, FETCH_DETAILS_FAIL
} from './actionTypes';
import { combineSearchResults } from '../../shared/utility';

const apiBase = 'https://swapi.dev/api/';

export interface Action {
	type: string;
	payload?: any; // Optionally, you can define a payload property with any type
}

/* * * * * * * * * * * * * * *
* ACTIVE ACTION TYPE METHODS *
* * * * * * * * * * * * * *  */
// action type methods return current active action type that is determined by the state of the fetch requests.
// Also these methods pass data passed from user methods to Redux reducers to update states
export const fetchDetailsStart = (identifier: string): FetchDetailsStartAction => ({
	type: FETCH_DETAILS_START,
	identifier: identifier,
});

export const fetchDetailsSuccess = (identifier: string, data: any = null): FetchDetailsSuccessAction => ({
	type: FETCH_DETAILS_SUCCESS,
	identifier: identifier,
	data: data,
});

export const fetchDetailsFail = (identifier: string, error: string = 'Error message missing. Please contact site administrator.'): FetchDetailsFailAction => ({
	type: FETCH_DETAILS_FAIL,
	identifier: identifier,
	error: error,
});

export const resetState = (identifier: string) => (dispatch: Dispatch<BaseAction>) => {
	dispatch(fetchDetailsSuccess(identifier));
};

export const updateDetailsState = (identifier: string, data: any = null) => (dispatch: Dispatch<BaseAction>) => {
	// Dispatch a fetchDetailsSuccess action
	dispatch(fetchDetailsSuccess(identifier, data));
};

export const searchTerm = (term: string, queryName: string) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(fetchDetailsStart('searchTerm'));

		try {
			let responses: any[] = [];

			if (queryName === 'all') {
				// Array of endpoints to query
				const endpoints = ['films', 'people', 'planets', 'starships'];

				// Make requests to each endpoint asynchronously
				const requests = endpoints.map(endpoint => axios.get(`${apiBase}${endpoint}/?search=${term}`));
				responses = await Promise.all(requests);
			} else {
				// Make the asynchronous request using Axios
				const response = await axios.get(`${apiBase}${queryName}/?search=${term}`);
				responses.push(response);
			}

			// Extract data from responses
			const data = combineSearchResults(responses.map(response => response.data));

			// Dispatch the success action with the fetched data
			dispatch(fetchDetailsSuccess('searchTerm', data));
		} catch (error) {
			// Dispatch the failure action with the error
			const errorMessage = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Unknown error');
			dispatch(fetchDetailsFail('searchTerm', errorMessage));
		}
	};
};

export const getDetails = (queryName: string, id: number) => {

	return async (dispatch: Dispatch<Action>) => {

		dispatch(fetchDetailsStart('getDetails'));
		try {
			// Make the asynchronous request using Axios
			const response = await axios.get(`${apiBase}${queryName}/${id}`);

			// Assuming the response.data contains the fetched user group data
			const data = response.data;

			// Dispatch the success action with the fetched data
			dispatch(fetchDetailsSuccess('getDetails', data));
		} catch (error) {
			// Dispatch the failure action with the error
			const errorMessage = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Unknown error');
			dispatch(fetchDetailsFail('getDetails', errorMessage));
		}
	};
};

export const getHomeworld = (queryName: string, id: number) => {

	return async (dispatch: Dispatch<Action>) => {

		dispatch(fetchDetailsStart('getHomeworld'));
		try {
			// Make the asynchronous request using Axios
			const response = await axios.get(`${apiBase}${queryName}/${id}`);

			// Assuming the response.data contains the fetched user group data
			const data = response.data;

			// Dispatch the success action with the fetched data
			dispatch(fetchDetailsSuccess('getHomeworld', data));
		} catch (error) {
			// Dispatch the failure action with the error
			const errorMessage = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Unknown error');
			dispatch(fetchDetailsFail('getHomeworld', errorMessage));
		}
	};
};

export const getFilmsNames = (filmUrls: string[]) => {
	return async (dispatch: Dispatch<any>) => {
		dispatch(fetchDetailsStart('getFilmsNames'));

		try {
			// Make requests to each film URL asynchronously
			const requests = filmUrls.map(url => axios.get(url));
			const responses = await Promise.all(requests);

			// Extract film names from responses
			const filmNames = responses.map(response => response.data.title);

			// Dispatch success action with film names
			dispatch(fetchDetailsSuccess('getFilmsNames', filmNames));
		} catch (error) {
			// Dispatch failure action with error message
			const errorMessage = typeof error === 'string' ? error : (error instanceof Error ? error.message : 'Unknown error');
			dispatch(fetchDetailsFail('getFilmsNames', errorMessage));
		}
	};
};
