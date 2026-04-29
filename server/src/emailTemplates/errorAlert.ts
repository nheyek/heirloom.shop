export const errorAlert = (params: {
	statusCode?: number;
	method?: string;
	path?: string;
	message?: string;
	stack?: string;
}) => `Error Alert

Status:  ${params.statusCode ?? 'N/A'}
Method:  ${params.method ?? 'N/A'}
Path:    ${params.path ?? 'N/A'}
Time:    ${new Date().toISOString()}

Message:
${params.message ?? 'No message'}

Stack Trace:
${params.stack ?? 'No stack trace'}`;
