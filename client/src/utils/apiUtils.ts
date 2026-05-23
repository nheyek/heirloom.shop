type SuccessBody<R> = R extends { status: 200 | 201; body: infer T }
	? T
	: never;

export type ApiResult<T> =
	| { data: T; error: null; status: 200 | 201 }
	| { data: null; error: string; status: number | null };

export async function callApi<
	R extends { status: number; body: unknown },
>(promise: Promise<R>): Promise<ApiResult<SuccessBody<R>>> {
	try {
		const response = await promise;
		if (response.status === 200 || response.status === 201) {
			return {
				data: response.body as SuccessBody<R>,
				error: null,
				status: response.status,
			};
		}
		const { body } = response;
		if (body !== null && typeof body === 'object' && 'error' in body) {
			return {
				data: null,
				error: (body as { error: string }).error,
				status: response.status,
			};
		}
		return {
			data: null,
			error: `Request failed with status ${response.status}`,
			status: response.status,
		};
	} catch (e) {
		return {
			data: null,
			error: e instanceof Error ? e.message : 'Network error',
			status: null,
		};
	}
}
