export default class {
	public static bpm(value: number, event?: Event): string {

		const bpm = value.toString(10);
		if (bpm.length < 3) {
			return '0' + bpm;
		}
		return bpm;
	}
}
