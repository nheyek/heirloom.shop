export const formatDateLong = (date: string | Date): string =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

export const formatDateShort = (date: string | Date): string =>
	new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'short',
		day: 'numeric',
	});

export const formatDateCompact = (date: string | Date): string =>
	new Date(date).toLocaleDateString('en-GB', {
		year: '2-digit',
		month: '2-digit',
		day: '2-digit',
	});
