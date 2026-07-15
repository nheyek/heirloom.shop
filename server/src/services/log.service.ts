import { ERROR_ALERT_EMAIL } from '@server/constants';
import { getEm } from '@server/db';
import { errorAlert } from '@server/emailTemplates/errorAlert';
import { ServerErrorLog } from '@server/entities/generated/ServerErrorLog';
import { sendEmail } from '@server/services/emailer.service';

export type ErrorLogParams = {
	statusCode?: number;
	method?: string;
	path?: string;
	message?: string;
	stack?: string;
	requestBody?: unknown;
	requestQuery?: unknown;
	userEmail?: string;
	ipAddress?: string;
	userAgent?: string;
};

export const logError = (params: ErrorLogParams): void => {
	const em = getEm();
	const log = em.create(ServerErrorLog, params);
	em.persist(log)
		.flush()
		.catch((e) => console.error('[error-log] Failed to write to DB:', e));

	sendEmail({
		to: ERROR_ALERT_EMAIL,
		subject: `[${params.statusCode ?? 'ERR'}] ${params.method ?? ''} ${params.path ?? 'unknown path'}`.trim(),
		text: errorAlert(params),
	});
};
