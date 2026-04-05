import { useAuth0 } from '@auth0/auth0-react';
import { UserInfo } from '@common/contract';
import React, { useContext, useEffect, useState } from 'react';
import { useApiClient } from '../hooks/useApiClient';
import { callApi } from '../utils/apiUtils';

type UserContextType = {
	user: UserInfo | null;
	isLoading: boolean;
	error: string | null;
	refresh: () => Promise<void>;
};

const UserContext = React.createContext<UserContextType | undefined>(
	undefined,
);

export const UserProvider = (props: {
	children: React.ReactNode;
}) => {
	const [user, setUser] = useState<UserInfo | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const apiClient = useApiClient();
	const { isAuthenticated } = useAuth0();

	const loadUser = async () => {
		setLoading(true);
		setError(null);

		const result = await callApi(apiClient.me.getMe());
		if (result.error !== null) {
			setError(result.error);
			setUser(null);
		} else {
			setUser(result.data);
		}

		setLoading(false);
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
				isLoading: loading,
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
		throw new Error(
			'useUserInfo must be used within a UserProvider',
		);
	}
	return ctx;
};
