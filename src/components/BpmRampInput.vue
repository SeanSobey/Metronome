<template>
	<b-input-group size="lg">
		<b-input-group-prepend>
			<b-input-group-text>
				<font-awesome-icon icon="signal" class="mr-1"/>Ramp
			</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput v-model="bpmFrom" :min="bpmMin" :max="bpmMax"></CompoundNumberInput>
		</b-input-group-text>
		<!-- <b-input-group-append>
			<b-input-group-text>42</b-input-group-text>
		</b-input-group-append> -->
		<b-input-group-prepend style="margin: 0 -1px;">
			<b-input-group-text>To</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput v-model="bpmTo" :min="bpmMin" :max="bpmMax"></CompoundNumberInput>
		</b-input-group-text>
		<b-input-group-append>
			<b-input-group-text>Over</b-input-group-text>
			<b-input-group-text>
				<input type="radio" v-on:click="enableTime()" v-model="timeEnabled">
				Secs
				&nbsp;
				<input type="radio" v-on:click="enableSteps()" v-model="stepsEnabled">
				Bars
			</b-input-group-text>
		</b-input-group-append>
	</b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { bpmMin, bpmMax } from './BpmConstants';
import Formatter from '../Formatter';
import CompoundNumberInput from './CompoundNumberInput.vue';

const overMin = 0;

interface Data {
	readonly bpmMin: number;
	readonly bpmMax: number;
	bpmFrom: number;
	bpmTo: number;
	interval: number;
	timeEnabled: boolean;
	stepsEnabled: boolean;
}

@Component({
	components: {
		CompoundNumberInput,
	},
	methods: {
		formatBpm: Formatter.bpm,
	},
})
export default class BpmRampInput extends Vue {
	public data(): Data {
		return {
			bpmFrom: 100,
			bpmTo: 100,
			interval: 100,
			bpmMin,
			bpmMax,
			timeEnabled: false,
			stepsEnabled: false,
		};
	}

	public incBpmFrom(): void {
		const data = this.$data as Data;
		if (data.bpmFrom >= data.bpmMax) {
			return;
		}
		data.bpmFrom++;
	}

	public decBpmFrom(): void {
		const data = this.$data as Data;
		if (data.bpmFrom <= data.bpmMin) {
			return;
		}
		data.bpmFrom--;
	}

	public incBpmTo(): void {
		const data = this.$data as Data;
		if (data.bpmTo >= data.bpmMax) {
			return;
		}
		data.bpmTo++;
	}

	public decBpmTo(): void {
		const data = this.$data as Data;
		if (data.bpmTo <= data.bpmMin) {
			return;
		}
		data.bpmTo--;
	}

	public incOver(): void {
		const data = this.$data as Data;
		data.interval += 10;
	}

	public decOver(): void {
		const data = this.$data as Data;
		if (data.interval <= overMin) {
			return;
		}
		data.interval -= 10;
	}

	public enableTime(): void {
		const data = this.$data as Data;
		data.timeEnabled = true;
		data.stepsEnabled = false;
	}

	public enableSteps(): void {
		const data = this.$data as Data;
		data.stepsEnabled = true;
		data.timeEnabled = false;
	}
}
</script>

<style scoped>
</style>
