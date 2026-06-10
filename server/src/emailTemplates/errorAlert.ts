export const errorAlert = (params: {
	statusCode?: number;
	method?: string;
	path?: string;
	message?: string;
	stack?: string;
	userEmail?: string;
	ipAddress?: string;
	userAgent?: string;
}) => `Error Alert

Status:    ${params.statusCode ?? 'N/A'}
Method:    ${params.method ?? 'N/A'}
Path:      ${params.path ?? 'N/A'}
Time:      ${new Date().toISOString()}

User:      ${params.userEmail ?? 'unauthenticated'}
IP:        ${params.ipAddress ?? 'N/A'}
User-Agent: ${params.userAgent ?? 'N/A'}

Message:
${params.message ?? 'No message'}

Stack Trace:
${params.stack ?? 'No stack trace'}`;
