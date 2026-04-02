import { Resend } from 'resend';
import { EMAIL_FROM } from '../constants';

const env = process.env.NODE_ENV;
const subjectPrefix = env && env !== 'production' ? `[${env}] ` : '';

export const sendEmail = async (params: {
	to: string;
	subject: string;
	html: string;
}) => {
	if (env === 'testing') return;

	const resend = new Resend(process.env.RESEND_API_KEY);
	return resend.emails.send({
		from: EMAIL_FROM,
		to: params.to,
		subject: `${subjectPrefix}${params.subject}`,
		html: params.html,
	});
};
