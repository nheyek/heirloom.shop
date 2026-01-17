export const formatDateRange = (minOffset: number, maxOffset: number) => {
	const today = new Date();

	const date1 = new Date(today);
	date1.setDate(today.getDate() + minOffset);

	const date2 = new Date(today);
	date2.setDate(today.getDate() + maxOffset);

	const monthFormat = new Intl.DateTimeFormat('en-US', { month: 'short' });

	const month1 = monthFormat.format(date1);
	const day1 = date1.getDate();

	const month2 = monthFormat.format(date2);
	const day2 = date2.getDate();

	if (month1 === month2) {
		return `${month1} ${day1} - ${day2}`;
	} else {
		return `${month1} ${day1} - ${month2} ${day2}`;
	}
};
