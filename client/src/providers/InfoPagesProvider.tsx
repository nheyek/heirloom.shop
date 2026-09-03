import { InfoPageKey } from '@heirloom/common/constants';
import React, { useContext, useEffect, useState } from 'react';
import { useApiClient } from '@client/hooks/useApiClient';
import { callApi } from '@client/utils/apiUtils';

type InfoPagesContextType = {
	getInfoPage: (key: InfoPageKey) => string | undefined;
	infoPagesLoading: boolean;
	infoPagesError: string | null;
};

const InfoPagesContext =
	React.createContext<InfoPagesContextType | null>(null);

export const InfoPagesProvider = (props: {
	children: React.ReactNode;
}) => {
	const apiClient = useApiClient();
	const [infoPages, setInfoPages] = useState<Map<InfoPageKey, string>>(
		new Map(),
	);
	const [isLoading, setIsLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const getInfoPage = (key: InfoPageKey) => infoPages.get(key);

	const loadInfoPages = async () => {
		setIsLoading(true);

		const result = await callApi(apiClient.infoPages.getAll());
		if (result.error !== null) {
			setError(result.error);
		} else {
			setInfoPages(
				new Map(
					result.data.map((infoPage) => [
						infoPage.key,
						infoPage.contentHtml,
					]),
				),
			);
		}

		setIsLoading(false);
	};

	useEffect(() => {
		loadInfoPages();
	}, []);

	return (
		<InfoPagesContext.Provider
			value={{
				getInfoPage,
				infoPagesLoading: isLoading,
				infoPagesError: error,
			}}
		>
			{props.children}
		</InfoPagesContext.Provider>
	);
};

export const useInfoPages = () => {
	const ctx = useContext(InfoPagesContext);
	if (!ctx) {
		throw new Error(
			'useInfoPages must be used within an InfoPagesProvider',
		);
	}
	return ctx;
};
