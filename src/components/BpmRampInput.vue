<template>
	<b-input-group size="lg">
		<b-input-group-prepend>
			<b-input-group-text>
				<font-awesome-icon icon="signal" class="mr-1"/>Ramp
			</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput v-model.number="inputValue.from" :disabled="!isEnabled()" :min="bpmMin" :max="bpmMax"></CompoundNumberInput>
		</b-input-group-text>
	<!-- <b-input-group-append>
			<b-input-group-text>42</b-input-group-text>
		</b-input-group-append> -->
		<b-input-group-prepend style="margin: 0 -1px;">
			<b-input-group-text>To</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput v-model.number="inputValue.to" :disabled="!isEnabled()" :min="bpmMin" :max="bpmMax"></CompoundNumberInput>
		</b-input-group-text>
		<b-input-group-append>
			<b-input-group-text>Over</b-input-group-text>
			<b-input-group-text>
				<input type="radio" v-model.number="inputValue.rampMode" value="1">
				Secs
				&nbsp;
				<input type="radio" v-model.number="inputValue.rampMode" value="2">
				Bars
				&nbsp;
				<input type="radio" v-model.number="inputValue.rampMode" value="0">
				Off
			</b-input-group-text>
		</b-input-group-append>
	</b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { bpmMin, bpmMax } from './BpmConstants';
import Formatter from '../Formatter';
import VueModel from './VueModel';
import CompoundNumberInput from './CompoundNumberInput.vue';

const overMin = 0;

export interface BpmRamp {
	from: number;
	to: number;
	rampMode: RampMode;
	interval: number;
}

export enum RampMode {
	Off = 0,
	Secs = 1,
	Bars = 2,
}

@Component({
	components: {
		CompoundNumberInput,
	},
})
export default class BpmRampInput extends VueModel<BpmRamp> {
	public readonly bpmMin: number = bpmMin;
	public readonly bpmMax: number = bpmMax;
	// public interval: number = 100;

	public formatBpm = Formatter.bpm;

	@Watch('inputValue', { deep: true })
	public inputValueWatcher(inputValue: BpmRamp): void {
		this.$emit('input', this.inputValue);
	}

	public incBpmFrom(): void {
		if (this.inputValue.from >= this.bpmMax) {
			return;
		}
		this.inputValue.from++;
	}

	public decBpmFrom(): void {
		if (this.inputValue.from <= this.bpmMin) {
			return;
		}
		this.inputValue.from--;
	}

	public incBpmTo(): void {
		if (this.inputValue.to >= this.bpmMax) {
			return;
		}
		this.inputValue.to++;
	}

	public decBpmTo(): void {
		if (this.inputValue.to <= this.bpmMin) {
			return;
		}
		this.inputValue.to--;
	}

	// public incOver(): void {
	// 	this.interval += 10;
	// }

	// public decOver(): void {
	// 	if (this.interval <= overMin) {
	// 		return;
	// 	}
	// 	this.interval -= 10;
	// }

	public isEnabled(): boolean {
		return this.inputValue.rampMode !== RampMode.Off;
	}
}
</script>

<style scoped lang="less">
</style>
