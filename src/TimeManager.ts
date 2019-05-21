import { IRuntimeManager } from './IRuntimeManager';
import { TimeObject } from 'tone';

//export type TimerStartCallback = (h: number, m: number, s: number, ms: number) => void;

export default class TimeManager implements IRuntimeManager {
	public time: TimeObject = { h: 0, m: 0, s: 0, ms: 0 };
	private _startTime: number | null;
	private _timer: number | null;
	private _interval: number;

	constructor() {
		this._startTime = null;
		this._timer = null;
		this._interval = 250; // adjust this number to affect granularity, lower numbers are more accurate, but more CPU-expensive
	}

	public start(): void {
		if (this._startTime === null) {
			this._startTime = new Date().getTime();
		}
		this._timer = setInterval(() => {
			const now = new Date().getTime();
			if (this._startTime === null) {
				throw new Error('startTime is null');
			}
			const distance = now - this._startTime;
			const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
			const s = Math.floor((distance % (1000 * 60)) / 1000);
			const ms = Math.floor((distance % 1000));
			this.time = { h, m, s, ms };

		}, this._interval);
	}

	public pause(): void {
		if (this._timer) {
			clearInterval(this._timer);
		}
	}

	public stop(): void {
		if (this._timer) {
			clearInterval(this._timer);
		}
		this._startTime = null;
		this.time = { h: 0, m: 0, s: 0, ms: 0 };
	}
}
