import { useAuth0 } from '@auth0/auth0-react';
import axios, { AxiosRequestConfig } from 'axios';

const callApi = async (config: AxiosRequestConfig) => {
	try {
		const response = await axios(config);
		const { data } = response;

		return {
			data,
			error: null,
		};
	} catch (error: unknown) {
		if (axios.isAxiosError(error)) {
			const axiosError = error;

			const { response } = axiosError;

			let message = 'http request failed';

			if (response && response.statusText) {
				message = response.statusText;
			}

			if (axiosError.message) {
				message = axiosError.message;
			}

			if (response && response.data && response.data.message) {
				message = response.data.message;
			}

			return {
				data: null,
				error: {
					message,
				},
			};
		}

		let message = 'unknown error';
		if (error instanceof Error) {
			message = error.message;
		}
		if (typeof error === 'string') {
			message = error;
		}

		return {
			data: null,
			error: {
				message,
			},
		};
	}
};

const apiServerUrl = process.env.REACT_APP_API_SERVER_URL;

export const useApi = () => {
	const { getIdTokenClaims } = useAuth0();

	const getPublicResource = async (endpoint: string) => {
		const config = {
			url: `/api/${endpoint}`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
			},
		};

		const { data, error } = await callApi(config);

		return {
			data: data || null,
			error,
		};
	};

	const getProtectedResource = async (endpoint: string) => {
		const claims = await getIdTokenClaims();

		if (!claims) {
			throw new Error('No ID token claims found');
		}

		const idToken = claims.__raw;

		const config = {
			url: `/api/${endpoint}`,
			method: 'GET',
			headers: {
				'content-type': 'application/json',
				Authorization: `Bearer ${idToken}`,
			},
		};

		const { data, error } = await callApi(config);

		return {
			data: data || null,
			error,
		};
	};

	return { getPublicResource, getProtectedResource };
};
