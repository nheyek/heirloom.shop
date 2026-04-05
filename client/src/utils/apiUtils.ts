type SuccessBody<R> = R extends { status: 200; body: infer T }
	? T
	: never;

export type ApiResult<T> =
	| { data: T; error: null }
	| { data: null; error: string };

export async function callApi<
	R extends { status: number; body: unknown },
>(promise: Promise<R>): Promise<ApiResult<SuccessBody<R>>> {
	try {
		const response = await promise;
		if (response.status === 200) {
			return { data: response.body as SuccessBody<R>, error: null };
		}
		const { body } = response;
		if (body !== null && typeof body === 'object' && 'error' in body) {
			return {
				data: null,
				error: (body as { error: string }).error,
			};
		}
		return {
			data: null,
			error: `Request failed with status ${response.status}`,
		};
	} catch (e) {
		return {
			data: null,
			error: e instanceof Error ? e.message : 'Network error',
		};
	}
}
