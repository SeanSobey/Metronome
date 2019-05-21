
<template>
	<div id="app">
		<div class="container">
			<!-- https://getbootstrap.com/docs/4.0/components/navbar/ -->
			<!-- https://bootstrap-vue.js.org/docs/components/navbar/ -->
			<!-- Header -->
			<b-navbar type="dark" variant="primary">
				<b-navbar-brand>
					<img src="./assets/icon.png" width="32" height="32" class="d-inline-block align-top">
					Metronome
				</b-navbar-brand>
				<b-navbar-nav class="ml-auto">
					<b-dropdown-item href="https://github.com/SeanSobey/Metronome">
						<font-awesome-icon :icon="['fab', 'github']" size="lg"/>
					</b-dropdown-item>
				</b-navbar-nav>
			</b-navbar>
			<b-jumbotron text-variant="center" class="my-2">
				<!-- Time -->
				<div class="border border-secondary rounded p-1 d-inline-flex flex-column">
					<div class="h2 m-1">
						<font-awesome-icon icon="clock" class="mr-3"/>
						<label>{{ timeManager.time | time() }}</label>
					</div>
					<div class="h3 m-1">
						<font-awesome-icon icon="spinner" class="mr-1"/>
						{{ currentBpm() }}
					</div>
				</div>
				<!-- Playback & Volume Controls -->
				<div>
					<PlaybackInput v-on:play="onPlay" v-on:stop="onStop" v-on:pause="onPause"></PlaybackInput>
					<VolumeInput v-on:volume-down="onVolumeDown" v-on:volume-up="onVolumeUp" v-on:volume-on="onVolumeOn" v-on:volume-off="onVolumeOff"></VolumeInput>
				</div>
				<hr>
				<!-- BPMpm Indicator -->
				<BpmIndicator :beatsPerBar="bpmIndicatorManager.beatsPerBar" :currentBeat="bpmIndicatorManager.currentBeat"></BpmIndicator>
				<hr>
				<!-- Time Signature -->
				<TimeSignatureInput v-model="beatsPerBar" :disabled="isPlaying()"></TimeSignatureInput>
				<!-- BPM -->
				<BpmInput v-model="bpm" :disabled="!isBpmInputEnabled()" class="my-4"></BpmInput>
				<BpmRampInput v-model="bpmRamp" :disabled="isPlaying()" class="my-4"></BpmRampInput>
			</b-jumbotron>
			<h2 class="text-center my-4">How to use the metronome</h2>
			<p class="text-center my-4">
				The metronome has an ajustable tempo that stretches from {{ bpmMin }} to {{ bpmMax }} BPM. You can use the metronome by adjusting the
				<b>
					<font-awesome-icon icon="spinner" class="mr-1"/>BPM
				</b> slider.
			</p>
			<p class="text-center my-4">
				You can configure the BPM over time by adjusting the
				<b>
					<font-awesome-icon icon="signal" class="mr-1"/>BPM Ramp
				</b> sliders. Specifying the start BPM, target BPM and the time the increase/decrease takes. This can happen in either a smooth increase in
				<b>seconds</b> or
				<b>beats</b>.
			</p>
		</div>
	</div>
</template>

<script lang="ts">
import Tone, { TimeObject } from 'tone';
import { Component, Vue, Watch } from 'vue-property-decorator';

import PlaybackInput from './components/PlaybackInput.vue';
import VolumeInput from './components/VolumeInput.vue';
import BpmInput from './components/BpmInput.vue';
import BpmIndicator from './components/BpmIndicator.vue';
import BpmRampInput, { BpmRamp, RampMode } from './components/BpmRampInput.vue';
import TimeSignatureInput from './components/TimeSignatureInput.vue';
import TimeManager from './TimeManager';
import { bpmMin, bpmMax, bpmIntervalMin, bpmIntervalMax } from './BpmConstants';
import { IRuntimeManager } from './IRuntimeManager';
import BpmIndicatorManager from './BpmIndicatorManager';
import { range } from './Utils';

Vue.filter('time', (value: TimeObject) => `${value.h}:${('0' + value.m).slice(-2)}:${('0' + value.s).slice(-2)}`);

@Component({
	components: {
		PlaybackInput,
		VolumeInput,
		BpmInput,
		BpmRampInput,
		BpmIndicator,
		TimeSignatureInput,
	},
})
export default class App extends Vue {
	public bpmMin = bpmMin;
	public bpmMax = bpmMax;
	public bpm: number = 100;
	public bpmRamp: BpmRamp = {
		from: 100,
		to: 100,
		rampMode: RampMode.Off,
		interval: 60,
	};
	private beatsPerBar: number = 4;
	private timeManager = new TimeManager();	// TODO: https://tonejs.github.io/docs/#Clock
	private isStopped: boolean = true;
	private isPaused: boolean = false;
	private accent: Tone.Player = new Tone.Player('./sounds/Ping Hi.wav').toMaster();
	private beat: Tone.Player = new Tone.Player('./sounds/Ping Low.wav').toMaster();
	private bpmIndicatorManager = new BpmIndicatorManager(this.beatsPerBar);

	constructor() {
		super();
		Tone.Transport.bpm.value = this.bpm;
	}

	@Watch('bpm')
	public bpmWatcher(): void {
		Tone.Transport.bpm.value = this.bpm;
	}

	@Watch('bpmRamp', { deep: true })
	public bpmRampWatcher(): void {
	}

	@Watch('beatsPerBar')
	public beatsPerBarWatcher(): void {
		this.bpmIndicatorManager = new BpmIndicatorManager(this.beatsPerBar);
		Tone.Transport.timeSignature = this.beatsPerBar;
	}

	public currentBpm(): string {
		return Tone.Transport.bpm.value.toFixed(0);
	}

	public isBpmInputEnabled(): boolean {
		return this.bpmRamp.rampMode === RampMode.Off;
	}

	public isPlaying(): boolean {
		if (this.isStopped) {
			return false;
		}
		if (this.isPaused) {
			return false;
		}
		return true;
	}

	public onPlay(): void {
		if (this.isPlaying()) {
			return;
		}
		Tone.Transport.bpm.value = this.bpm;
		if (this.isStopped) {
			this.setupBpmMode();
			const sequence = this.createNoteSequence();
			sequence.start(0);
		}
		if (this.isPaused) {
		}
		this.isStopped = false;
		this.isPaused = false;
		Tone.Transport.start();
		this.timeManager.start();
		this.bpmIndicatorManager.start();
	}

	public onStop(): void {
		Tone.Transport.stop();
		Tone.Transport.cancel(0);
		Tone.Transport.seconds = 0;
		this.timeManager.stop();
		this.bpmIndicatorManager.stop();
		this.isStopped = true;
	}

	public onPause(): void {
		(Tone.Transport.pause as any)();
		this.timeManager.pause();
		this.bpmIndicatorManager.pause();
		this.isPaused = true;
	}

	public onVolumeDown(volume: number): void {
		Tone.Master.mute = false;
		Tone.Master.volume.value = volume;
	}

	public onVolumeUp(volume: number): void {
		Tone.Master.mute = false;
		Tone.Master.volume.value = volume;
	}

	public onVolumeOn(): void {
		Tone.Master.mute = false;
	}

	public onVolumeOff(): void {
		Tone.Master.mute = true;
	}

	private createNoteSequence(): Tone.Sequence {
		const accentNote = 'G2';
		const beatNote = 'C2';
		const notes: Tone.SequenceArray = [accentNote, ...new Array(this.beatsPerBar - 1).fill(beatNote)];
		return new Tone.Sequence((time, note) => {
			/* eslint-disable indent */
			switch (note) {
				case accentNote:
					this.accent.start(time);
					break;
				case beatNote:
					this.beat.start(time);
					break;
				default:
					break;
			}
			/* eslint-enable indent */
		}, notes, '4n');
	}

	private setupBpmMode(): void {
		/* eslint-disable indent */
		switch (this.bpmRamp.rampMode) {
			case RampMode.Secs:
				Tone.Transport.bpm.rampTo(this.bpmRamp.to, this.bpmRamp.interval);
				break;
			case RampMode.Bars:
				const loop = new Tone.Loop((time) => {
					if (this.bpmIndicatorManager.currentBeat === this.beatsPerBar) {
						const increase = (this.bpmRamp.to - this.bpmRamp.from) / this.bpmRamp.interval;
						const bpm = Math.round(Math.max(Math.min(Tone.Transport.bpm.value + increase, this.bpmRamp.to), this.bpmRamp.from));
						Tone.Transport.bpm.setValueAtTime(bpm, time);
					}
				}, '4n');
				loop.start(0);
				break;
			case RampMode.Off:
				break;
			default:
				throw new Error(`Un-handled ramp mode: ${this.bpmRamp.rampMode}`);
		}
		/* eslint-enable indent */
	}

	// private _loop(time: number): void {
	// 	const timeSignatureSubvisions = Array.isArray(Tone.Transport.timeSignature)
	// 		? Tone.Transport.timeSignature[0]
	// 		: Tone.Transport.timeSignature;
	// 	this.currentNote = (this.currentNote % timeSignatureSubvisions) + 1;
	// 	if (this.currentNote === 1) {
	// 		this.accent.start(time);
	// 	} else {
	// 		this.beat.start(time);
	// 	}
	// 	if (this.bpmRamp.rampMode === RampMode.Beats && this.currentNote === timeSignatureSubvisions) {
	// 		const increase = (this.bpmRamp.to - this.bpmRamp.from) / this.bpmRamp.interval;
	// 		const bpm = Math.round(Math.max(Math.min(Tone.Transport.bpm.value + increase, this.bpmRamp.to), this.bpmRamp.from));
	// 		Tone.Transport.bpm.setValueAtTime(bpm, time);
	// 	}
	// 	this.bpm = Math.round(Tone.Transport.bpm.value);
	// }
}
</script>

<style scoped lang="less">
</style>
