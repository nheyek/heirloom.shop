import { EMAIL_FROM } from '@server/constants';
import { Resend } from 'resend';

const env = process.env.NODE_ENV;

export const sendEmail = (params: {
	to: string;
	subject: string;
	text: string;
}): void => {
	if (env === 'testing') return;

	const resend = new Resend(process.env.RESEND_API_KEY);
	const subject =
		env !== 'production'
			? `[${env!.toUpperCase()}] ${params.subject}`
			: params.subject;

	resend.emails
		.send({
			to: params.to,
			from: EMAIL_FROM,
			subject,
			text: params.text,
		})
		.catch((e) =>
			console.error('[emailer] Failed to send email:', e),
		);
};
