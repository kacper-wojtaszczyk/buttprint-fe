function pad(n: number): string {
	return String(n).padStart(2, '0');
}

export function toRFC3339Local(datetimeLocal: string): string {
	const local = new Date(datetimeLocal);
	const offsetMin = local.getTimezoneOffset();
	const withSeconds = datetimeLocal.length === 16 ? `${datetimeLocal}:00` : datetimeLocal;

	if (offsetMin === 0) return `${withSeconds}Z`;

	const sign = offsetMin < 0 ? '+' : '-';
	const abs = Math.abs(offsetMin);
	return `${withSeconds}${sign}${pad(Math.floor(abs / 60))}:${pad(abs % 60)}`;
}

export function toDatetimeLocalValue(rfc3339: string): string {
	const d = new Date(rfc3339);
	return (
		`${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}` +
		`T${pad(d.getHours())}:${pad(d.getMinutes())}`
	);
}
