export const FETCH_DETAILS_START: string = 'FETCH_DETAILS_START';
export const FETCH_DETAILS_SUCCESS: string = 'FETCH_DETAILS_SUCCESS';
export const FETCH_DETAILS_FAIL: string = 'FETCH_DETAILS_FAIL';

export interface Action {
	type: string; // Type field indicating the action type
	// Add other fields as needed for specific actions
}

export interface BaseAction {
	type: string;
}


export interface FetchDetailsStartAction extends BaseAction {
	type: typeof FETCH_DETAILS_START;
	identifier: string;
}

export interface FetchDetailsSuccessAction extends BaseAction {
	type: typeof FETCH_DETAILS_SUCCESS;
	identifier: string;
	data: {} | null; // Adjust the type according to your data type
}

export interface FetchDetailsFailAction extends BaseAction {
	type: typeof FETCH_DETAILS_FAIL;
	identifier: string;
	error: string;
}