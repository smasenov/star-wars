export const isFullString = (value: any): value is string => {
	return typeof value === 'string' && value.trim() !== '';
};

export const capitalize = (value: string, othersLowercase: boolean = true): string => {
	return isFullString(value) ? (
		`${value.slice(0, 1).toUpperCase()}${value.length > 1 ? (othersLowercase ? value.slice(1).toLowerCase() : value.slice(1)) : ''}`
	) : '';
};
// Define a function called isNull that takes a parameter of any type and returns a boolean
export const isNull = (value: any): boolean => {
	// Check if the value is falsy (null, undefined, 0, '', etc.) AND it's of type 'object'
	return (!value && typeof value === 'object');
};

// Define a function called isArray that takes a parameter of any type and returns a boolean
export const isArray = (value: any): boolean => {
	// Check if the value is of type 'object' and it's an array
	return (typeof value === 'object' && Array.isArray(value));
};

// Define a function called isObject that takes a parameter of any type and returns a boolean
export const isObject = (value: any): boolean => {
	// Check if the value is of type 'object', not null, and not an array
	return (typeof value === 'object' && !isNull(value) && !isArray(value));
};

export const isFullArray = (value: any): boolean => {
	// Check if the value is an array and it has a length greater than 0
	return isArray(value) && !!value.length;
};

export const extractNumberFromUrl = (url: string): number | null => {
	// Regular expression to match the number between double slashes and the next slash in the URL
	const regex: RegExp = /\/\/.*?\/(\d+)\//;
	const match: RegExpMatchArray | null = url.match(regex);

	// If a match is found, return the extracted number
	if (match && match[1]) {
		return parseInt(match[1], 10);
	} else {
		// Return null if no match is found
		return null;
	}
}

type SearchResult = {
	results: any[];
}

export const combineSearchResults = (searchResults: SearchResult[]): { results: any[] } => {
	// Initialize an array to store all results
	let allResults: any[] = [];

	// Iterate over each search result object
	searchResults.forEach(result => {
		// Check if the result object has a 'results' key and its value is an array
		if (result.results && Array.isArray(result.results)) {
			// Push the array of results to the allResults array
			allResults = [...allResults, ...result.results];
		}
	});

	// Return an object with a single key 'result' containing the combined results array
	return { results: allResults };
};

export const extractResourceTypeFromUrl = (url: string): string | null => {
	const regex: RegExp = /\/(starships|planets|people|vehicles)\/\d+\//;
	const match: RegExpMatchArray | null = url.match(regex);

	if (match && match[1]) {
		return match[1]; // Returns either "starships", "planets", "people", or "vehicles"
	} else {
		return null;
	}
};