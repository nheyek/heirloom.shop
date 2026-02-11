import { useEffect, useState } from 'react';

type StorageType = 'localStorage' | 'sessionStorage';

export const usePersistedState = <T>(
	key: string,
	initialValue: T,
	storageType: StorageType = 'localStorage',
): [T, React.Dispatch<React.SetStateAction<T>>] => {
	const [state, setState] = useState<T>(() => {
		try {
			const storage =
				storageType === 'localStorage'
					? localStorage
					: sessionStorage;
			const item = storage.getItem(key);
			if (item) {
				return JSON.parse(item) as T;
			}
		} catch (error) {
			console.error(
				`Error loading ${key} from ${storageType}:`,
				error,
			);
		}
		return initialValue;
	});

	useEffect(() => {
		try {
			const storage =
				storageType === 'localStorage'
					? localStorage
					: sessionStorage;
			storage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.error(
				`Error saving ${key} to ${storageType}:`,
				error,
			);
		}
	}, [key, state, storageType]);

	return [state, setState];
};
