import { useEffect, useRef, useCallback, useState } from 'react';

interface TimeoutReturn {
	reset: () => void;
	clear: () => void;
}

export default function useTimeout(callback: () => void, delay: number): TimeoutReturn {
	const callbackRef = useRef<() => void>(callback);
	const timeoutRef = useRef<NodeJS.Timeout>();

	useEffect(() => {
		callbackRef.current = callback;
	}, [callback]);

	const set = useCallback(() => {
		timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
	}, [delay]);

	const clear = useCallback(() => {
		timeoutRef.current && clearTimeout(timeoutRef.current);
	}, []);

	useEffect(() => {
		set();
		return clear;
	}, [delay, set, clear]);

	const reset = useCallback(() => {
		clear();
		set();
	}, [clear, set]);

	return { reset, clear };
}

type Callback<T> = (value: T) => void;

function useDebounce<T>(callback: Callback<T>, delay: number, dependencies: any[]): Callback<T> {
	const [value, setValue] = useState<T | undefined>(undefined);
	const { reset, clear } = useTimeout(() => {
		if (value !== undefined) {
			callback(value);
			setValue(undefined);
		}
	}, delay);

	useEffect(() => {
		reset();
		return clear;
	}, [...dependencies, value, delay, reset, clear]);

	return (value: T) => setValue(value);
}

export interface UseArrayReturn<T> {
	array: T[];
	set: (value: T[]) => void;
	push: (element: T) => void;
	filter: (callback: (value: T, index: number, array: T[]) => boolean) => void;
	update: (index: number, newElement: T) => void;
	remove: (index: number) => void;
	clear: () => void;
}

function useArray<T>(defaultValue: T[]): UseArrayReturn<T> {
	const [array, setArray] = useState<T[]>(defaultValue);

	function push(element: T) {
		setArray(a => [...a, element]);
	}

	function filter(callback: (value: T, index: number, array: T[]) => boolean) {
		setArray(a => a.filter(callback));
	}

	function update(index: number, newElement: T) {
		setArray(a => [
			...a.slice(0, index),
			newElement,
			...a.slice(index + 1, a.length),
		]);
	}

	function remove(index: number) {
		setArray(a => [...a.slice(0, index), ...a.slice(index + 1, a.length)]);
	}

	function clear() {
		setArray([]);
	}

	return { array, set: setArray, push, filter, update, remove, clear };
}



export { useDebounce, useArray }

