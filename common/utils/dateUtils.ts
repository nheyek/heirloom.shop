const US_HOLIDAYS: Set<string> = new Set([
	// New Year's Day
	'01-01',
	// MLK Day — 3rd Monday in January (approx Jan 15-21)
	// Presidents' Day — 3rd Monday in February
	// Memorial Day — last Monday in May
	// Juneteenth
	'06-19',
	// Independence Day
	'07-04',
	// Labor Day — 1st Monday in September
	// Thanksgiving — 4th Thursday in November
	// Christmas
	'12-25',
]);

// Floating holidays that depend on the year
const getFloatingHolidays = (year: number): Set<string> => {
	const dates: string[] = [];

	const pad = (n: number) => String(n).padStart(2, '0');
	const fmt = (d: Date) =>
		`${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
	const nthWeekday = (
		year: number,
		month: number,
		weekday: number,
		n: number,
	) => {
		const d = new Date(year, month, 1);
		d.setDate(1 + ((weekday - d.getDay() + 7) % 7) + (n - 1) * 7);
		return d;
	};
	const lastWeekday = (
		year: number,
		month: number,
		weekday: number,
	) => {
		const d = new Date(year, month + 1, 0);
		d.setDate(d.getDate() - ((d.getDay() - weekday + 7) % 7));
		return d;
	};

	dates.push(fmt(nthWeekday(year, 0, 1, 3))); // MLK Day
	dates.push(fmt(nthWeekday(year, 1, 1, 3))); // Presidents' Day
	dates.push(fmt(lastWeekday(year, 4, 1))); // Memorial Day
	dates.push(fmt(nthWeekday(year, 8, 1, 1))); // Labor Day
	dates.push(fmt(nthWeekday(year, 10, 4, 4))); // Thanksgiving

	return new Set(dates);
};

const isBusinessDay = (date: Date): boolean => {
	const day = date.getDay();
	if (day === 0 || day === 6) return false;

	const month = String(date.getMonth() + 1).padStart(2, '0');
	const d = String(date.getDate()).padStart(2, '0');
	const mmdd = `${month}-${d}`;

	if (US_HOLIDAYS.has(mmdd)) return false;
	if (getFloatingHolidays(date.getFullYear()).has(mmdd))
		return false;

	return true;
};

const addBusinessDays = (start: Date, days: number): Date => {
	const result = new Date(start);
	let remaining = days;
	while (remaining > 0) {
		result.setDate(result.getDate() + 1);
		if (isBusinessDay(result)) remaining--;
	}
	return result;
};

export const calculateDeliveryEstimate = (
	processingProfile: { minDays: number; maxDays: number },
	shippingProfile: { shippingDaysMin: number; shippingDaysMax: number },
): string => {
	const today = new Date();
	const date1 = addBusinessDays(
		today,
		processingProfile.minDays + shippingProfile.shippingDaysMin,
	);
	const date2 = addBusinessDays(
		today,
		processingProfile.maxDays + shippingProfile.shippingDaysMax,
	);
	return formatDateRange(date1, date2);
};

export const formatDateRange = (date1: Date, date2: Date) => {
	const monthFormat = new Intl.DateTimeFormat('en-US', {
		month: 'short',
	});

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
