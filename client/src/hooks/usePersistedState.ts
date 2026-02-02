import { useEffect, useState } from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

/**
 * A hook that persists state to localStorage or sessionStorage.
 * Automatically loads the value on mount and saves on every update.
 * 
 * @param key - The storage key to use
 * @param initialValue - The initial value if nothing is in storage
 * @param storageType - 'localStorage' (default) or 'sessionStorage'
 * @returns A stateful value and setter function, just like useState
 * 
 * @example
 * const [cart, setCart] = usePersistedState('shopping-cart', [], 'localStorage');
 */
export const usePersistedState = <T>(
	key: string,
	initialValue: T,
	storageType: StorageType = 'localStorage',
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	// Get the storage object
	const storage = storageType === 'localStorage' ? localStorage : sessionStorage;

	// Initialize state with value from storage or initial value
	const [state, setState] = useState<T>(() => {
		try {
			const item = storage.getItem(key);
			if (item) {
				return JSON.parse(item) as T;
			}
		} catch (error) {
			console.error(`Error loading ${key} from ${storageType}:`, error);
		}
		return initialValue;
	});

	// Save to storage whenever state changes
	useEffect(() => {
		try {
			storage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.error(`Error saving ${key} to ${storageType}:`, error);
		}
	}, [key, state, storage, storageType]);

	return [state, setState];
};
