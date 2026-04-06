import { EMAIL_FROM } from '@server/constants';
import { Resend } from 'resend';

const env = process.env.NODE_ENV;

export const sendEmail = async (params: {
	to: string;
	subject: string;
	html: string;
}) => {
	if (env === 'testing') return;

	const resend = new Resend(process.env.RESEND_API_KEY);
	const subject =
		env !== 'production'
			? `[${env!.toUpperCase()}] ${params.subject}`
			: params.subject;

	return resend.emails.send({
		to: params.to,
		from: EMAIL_FROM,
		subject,
		html: params.html,
	});
};
