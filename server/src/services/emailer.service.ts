import { Resend } from 'resend';

const env = process.env.NODE_ENV;

export const sendEmail = async (params: {
	to: string;
	template: {
		id: string;
		variables?: Record<string, string | number> | undefined;
	};
}) => {
	if (env === 'testing') return;

	const resend = new Resend(process.env.RESEND_API_KEY);
	return resend.emails.send({
		to: params.to,
		template: params.template,
	});
};
