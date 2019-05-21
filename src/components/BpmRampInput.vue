<template>
	<b-input-group size="lg">
		<b-input-group-prepend>
			<b-input-group-text>
				<font-awesome-icon icon="signal" class="mr-1"/>Ramp
			</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput
				v-model.number="inputValue.from"
				:disabled="!isEnabled()"
				:min="bpmMin"
				:max="bpmMax"
			></CompoundNumberInput>
		</b-input-group-text>
		<b-input-group-prepend class="bpm-ramp-input-inline-prepend">
			<b-input-group-text>To</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput
				v-model.number="inputValue.to"
				:disabled="!isEnabled()"
				:min="bpmMin"
				:max="bpmMax"
			></CompoundNumberInput>
		</b-input-group-text>
		<b-input-group-prepend class="bpm-ramp-input-inline-prepend">
			<b-input-group-text>Over</b-input-group-text>
		</b-input-group-prepend>
		<b-input-group-text class="rounded-0 bg-white flex-fill">
			<CompoundNumberInput
				v-model.number="inputValue.interval"
				:disabled="!isEnabled()"
				:min="bpmIntervalMin"
				:max="bpmIntervalMax"
			></CompoundNumberInput>
		</b-input-group-text>
		<b-input-group-append>
			<b-button-group size="sm">
				<b-button
					v-for="(btn, index) in buttons"
					:key="index"
					:pressed.sync="btn.pressed"
					:disabled="disabled"
					v-on:click="onButtonClick(index)"
					variant="primary"
				>{{ btn.caption }}</b-button>
			</b-button-group>
		</b-input-group-append>
	</b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { bpmMin, bpmMax, bpmIntervalMin, bpmIntervalMax } from '../BpmConstants';
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

type ButtonCaption = 'Off' | 'Secs' | 'Bars';

@Component({
	components: {
		CompoundNumberInput,
	},
})
export default class BpmRampInput extends VueModel<BpmRamp> {
	@Prop({ required: false, default: false }) public disabled!: boolean;
	public readonly bpmMin: number = bpmMin;
	public readonly bpmMax: number = bpmMax;
	public readonly bpmIntervalMin: number = bpmIntervalMin;
	public readonly bpmIntervalMax: number = bpmIntervalMax;
	public interval: number = 100;
	public buttons: Array<{ caption: ButtonCaption, pressed: boolean}> = [
		{ caption: 'Off', pressed: true },
		{ caption: 'Secs', pressed: false },
		{ caption: 'Bars', pressed: false },
	];

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

	public onButtonClick(index: number): void {
		for (const [buttonIndex, button] of this.buttons.entries()) {
			if (buttonIndex !== index) {
				button.pressed = false;
			}
			if (button.caption === 'Off' && button.pressed) {
				this.inputValue.rampMode = RampMode.Off;
			}
			if (button.caption === 'Secs' && button.pressed) {
				this.inputValue.rampMode = RampMode.Secs;
			}
			if (button.caption === 'Bars' && button.pressed) {
				this.inputValue.rampMode = RampMode.Bars;
			}
		}
	}

	public isEnabled(): boolean {
		return !this.disabled && this.inputValue.rampMode !== RampMode.Off;
	}
}
</script>

<style scoped lang="less">
.bpm-ramp-input-inline-prepend {
	margin: 0 -1px;
}
</style>
