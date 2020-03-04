export function isObject(item: Record<string, string>): boolean {
	return Object.prototype.toString.call(item) === '[object Object]';
}

export function getPercentage(count: number, total: number): number {
	return total === 0 ? 0 : parseInt(((count / total) * 100).toString(10), 10);
}
