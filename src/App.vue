<template>
	<div id="app">
		<div class="container">
			<!-- https://getbootstrap.com/docs/4.0/components/navbar/ -->
			<!-- https://bootstrap-vue.js.org/docs/components/navbar/ -->
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
				<h2>
					<font-awesome-icon icon="clock" class="mr-3"/>
					<label>{{time | time()}}</label>
				</h2>
				<!-- Playback Controls -->
				<PlaybackInput v-on:play="onPlay" v-on:stop="onStop" v-on:pause="onPause"></PlaybackInput>
				<!-- Volume Controls -->
				<VolumeInput v-on:volume-down="onVolumeDown" v-on:volume-up="onVolumeUp" v-on:volume-on="onVolumeOn" v-on:volume-off="onVolumeOff"></VolumeInput>
				<hr>
				<!-- BBPMpm Indicator -->
				<BpmIndicator :currentNote="currentNote"></BpmIndicator>
				<hr>
				<!-- BPM -->
				<BpmInput v-model="bpm" class="my-4"></BpmInput>
				<BpmRampInput v-model="bpmRamp" class="my-4"></BpmRampInput>
			</b-jumbotron>
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import PlaybackInput from './components/PlaybackInput.vue';
import VolumeInput from './components/VolumeInput.vue';
import BpmInput from './components/BpmInput.vue';
import BpmIndicator from './components/BpmIndicator.vue';
import BpmRampInput, { BpmRamp, RampMode } from './components/BpmRampInput.vue';
import Tone, { TimeObject } from 'tone';
import Timer from './Timer';

Vue.filter('time', (value: TimeObject) => `${value.h}:${('0' + value.m).slice(-2)}:${('0' + value.s).slice(-2)}`);

@Component({
	components: {
		PlaybackInput,
		VolumeInput,
		BpmInput,
		BpmRampInput,
		BpmIndicator,
	},
})
export default class App extends Vue {
	public time: TimeObject = { h: 0, m: 0, s: 0, ms: 0 };
	public bpm: number = 100;
	public bpmRamp: BpmRamp = {
		from: 100,
		to: 100,
		rampMode: RampMode.Off,
		interval: 60,
	};
	private timer = new Timer();	// TODO: https://tonejs.github.io/docs/#Clock
	private isPlaying: boolean = false;
	private currentNote: number = 0;
	private accent: Tone.Player = new Tone.Player('./sounds/Ping Hi.wav').toMaster();
	private beat: Tone.Player = new Tone.Player('./sounds/Ping Low.wav').toMaster();

	public mounted(): void {
		const synth = new Tone.Synth().toMaster();
		// synth.triggerAttackRelease("C4", "8n");
	}

	public onPlay(): void {
		this.currentNote = 0;
		if (this.bpmRamp.rampMode !== RampMode.Off) {
			this.bpm = this.bpmRamp.from;
		}
		// Have to do both for weird reasons :(
		Tone.Transport.bpm.value = this.bpm;
		Tone.Transport.bpm.setValueAtTime(this.bpm, '+0');
		if (this.bpmRamp.rampMode === RampMode.Secs) {
			Tone.Transport.bpm.rampTo(this.bpmRamp.to, this.bpmRamp.interval);
		}
		// https://tonejs.github.io/docs/#types/Time
		Tone.Transport.scheduleRepeat(this._loop.bind(this), '4n');
		Tone.Transport.start();
		this.timer.start((h, m, s, ms) => (this.time = { h, m, s, ms }));
	}

	public onStop(): void {
		this.currentNote = 0;
		Tone.Transport.stop();
		Tone.Transport.cancel();
		this.timer.stop();
		this.time = {
			h: 0,
			m: 0,
			s: 0,
			ms: 0,
		};
		// this.isPlaying = false;
	}

	public onPause(): void {
		Tone.Transport.pause();
		this.timer.pause();
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

	@Watch('bpm')
	public bpmWatcher(): void {
		Tone.Transport.bpm.value = this.bpm;
	}

	@Watch('bpmRamp', { deep: true })
	public bpmRampWatcher(): void {
	}

	private _loop(time: number): void {
		const timeSignature = Array.isArray(Tone.Transport.timeSignature)
			? Tone.Transport.timeSignature[0]
			: Tone.Transport.timeSignature;
		this.currentNote = (this.currentNote % timeSignature) + 1;
		if (this.currentNote === 1) {
			this.accent.start(time);
		} else {
			this.beat.start(time);
		}
		if (this.bpmRamp.rampMode === RampMode.Bars && this.currentNote === Tone.Transport.timeSignature) {
			const increase = (this.bpmRamp.to - this.bpmRamp.from) / this.bpmRamp.interval;
			const bpm = Math.round(Math.max(Math.min(Tone.Transport.bpm.value + increase, this.bpmRamp.to), this.bpmRamp.from));
			Tone.Transport.bpm.setValueAtTime(bpm, time);
		}
		this.bpm = Math.round(Tone.Transport.bpm.value);
	}
}
</script>

<style scoped lang="less">
</style>
