import { IRuntimeManager } from './IRuntimeManager';
import { Loop } from 'tone';

export default class BpmIndicatorManager implements IRuntimeManager {
	public currentBeat: number;
	public beatsPerBar: number;

	private loop: Loop;

	constructor(beatsPerBar: number) {
		this.currentBeat = 0;
		this.beatsPerBar = beatsPerBar;
		this.loop = new Loop(() => {
			this.currentBeat = (this.currentBeat % beatsPerBar) + 1;
		}, `4n`);
	}

	public start(): void {
		(this.loop.start as any)();
	}

	public stop(): void {
		(this.loop.stop as any)();
		this.loop.start(0);
		(this.loop.stop as any)();
		this.currentBeat = 0;
	}

	public pause(): void {
		(this.loop.stop as any)();
	}
}
