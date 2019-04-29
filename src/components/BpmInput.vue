<template>
	<b-input-group size="lg">
		<b-input-group-prepend>
			<b-input-group-text>
				<font-awesome-icon icon="spinner" class="mr-1"/>BPM
			</b-input-group-text>
		</b-input-group-prepend>
		<b-form-input type="range" size="lg" :min="bpmMin" :max="bpmMax" v-model="bpm"></b-form-input>
		<b-input-group-append>
			<b-button-group>
				<b-button variant="primary" v-b-tooltip.hover title="BPM--" v-on:click="decBpm()">
					<font-awesome-icon icon="minus"/>
				</b-button>
				<b-button variant="primary" v-b-tooltip.hover title="BPM++" v-on:click="incBpm()">
					<font-awesome-icon icon="plus"/>
				</b-button>
			</b-button-group>
			<b-button
				variant="outline-primary"
				v-b-tooltip.hover
				title="BPM Tap"
				v-on:click="tapBpm($event);"
			>Tap</b-button>
			<b-input-group-text>{{ formatBpm(bpm) }}</b-input-group-text>
		</b-input-group-append>
	</b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bpmMin, bpmMax } from './BpmConstants';
import Formatter from '../Formatter';

interface Data {
	bpm: number;
	readonly bpmMin: number;
	readonly bpmMax: number;
	taps: Array<number>;
}

const tapTimeout = 1000 * 4;

@Component({
	methods: {
		formatBpm: Formatter.bpm,
	},
})
export default class extends Vue {
	@Prop() private readonly msg!: string;

	public data(): Data {
		return {
			bpm: 100,
			bpmMin,
			bpmMax,
			taps: [],
		};
	}

	public incBpm(): void {
		const data = this.$data as Data;
		if (data.bpm >= data.bpmMax) {
			return;
		}
		data.bpm++;
	}

	public decBpm(): void {
		const data = this.$data as Data;
		if (data.bpm <= data.bpmMin) {
			return;
		}
		data.bpm--;
	}

	public tapBpm(event: MouseEvent): void {
		const target = event.target as HTMLButtonElement;
		target.blur();

		const data = this.$data as Data;
		const now = new Date().getTime();
		if (
			data.taps.length > 0 &&
			now - data.taps[data.taps.length - 1] > tapTimeout
		) {
			data.taps = [];
			data.bpm = 100;
		}
		data.taps.push(now);
		if (data.taps.length === 1) {
			return;
		}
		const tapsDifference = [];
		for (let index = 1; index < data.taps.length; index++) {
			tapsDifference.push(data.taps[index] - data.taps[index - 1]);
		}
		const avg = tapsDifference.reduce((a, b) => a + b) / tapsDifference.length;
		data.bpm = Math.round((1000 * 60) / avg);
		// Tone.Transport.bpm.value = data.bpm;
	}
}
</script>
