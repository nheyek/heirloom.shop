export const formatCentsAsDollars = (cents: number): string =>
	(cents / 100).toLocaleString('en-US', {
		style: 'currency',
		currency: 'USD',
	});
