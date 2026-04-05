type ErrorBody = { error: string };
type SuccessBody<R> = R extends { status: 200; body: infer T }
	? T
	: never;

export async function callApi<
	R extends { status: number; body: unknown },
>(promise: Promise<R>): Promise<SuccessBody<R> | ErrorBody> {
	try {
		const response = await promise;
		if (response.status === 200)
			return response.body as SuccessBody<R>;
		const { body } = response;
		if (
			body !== null &&
			typeof body === 'object' &&
			'error' in body
		) {
			return body as ErrorBody;
		}
		return {
			error: `Request failed with status ${response.status}`,
		};
	} catch (e) {
		return {
			error: e instanceof Error ? e.message : 'Network error',
		};
	}
}
