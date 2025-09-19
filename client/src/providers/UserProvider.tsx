import { UserInfo } from '@common/types/UserInfo';
import React, { useContext, useEffect, useState } from 'react';
import useApi from '../hooks/useApi';
import { useAuth0 } from '@auth0/auth0-react';

type UserContextType = {
	user: UserInfo | null;
	loading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
};

const UserContext = React.createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props: { children: React.ReactNode }) => {
	const [user, setUser] = useState<UserInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const { getProtectedResource } = useApi();
	const { isAuthenticated } = useAuth0();

	const loadUser = async () => {
		try {
			setLoading(true);
			setError(null);

			const res = await getProtectedResource('me');

			if (res.error) {
				throw new Error(`Failed to fetch user: ${res.error}`);
			}

			const data: UserInfo = await res.data;
			setUser(data);
		} catch (err: any) {
			setError(err.message ?? 'Unknown error');
			setUser(null);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (isAuthenticated) {
			loadUser();
		} else {
			setUser(null);
		}
	}, [isAuthenticated]);

	return (
		<UserContext.Provider
			value={{
				user,
				loading,
				error,
				refresh: loadUser,
			}}
		>
			{props.children}
		</UserContext.Provider>
	);
};

export const useUserInfo = () => {
	const ctx = useContext(UserContext);
	if (!ctx) {
		throw new Error('useUserInfo must be used within a UserProvider');
	}
	return ctx;
};
