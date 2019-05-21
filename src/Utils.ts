export function* range(start: number, end: number = Infinity): IterableIterator<number> {
	// tslint:disable-next-line: no-let
	for (let i = start; i <= end; i++) {
		yield i;
	}
}
