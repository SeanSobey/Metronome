<template>
	<b-input-group size="lg">
		<b-input-group-prepend>
			<b-input-group-text>
				<font-awesome-icon icon="spinner" class="mr-1"/>BPM
			</b-input-group-text>
		</b-input-group-prepend>
		<b-form-input type="range" size="lg" v-model.number="inputValue" :min="bpmMin" :max="bpmMax"></b-form-input>
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
			<b-input-group-text>{{ formatBpm(inputValue) }}</b-input-group-text>
		</b-input-group-append>
	</b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { bpmMin, bpmMax } from '../BpmConstants';
import Formatter from '../Formatter';
import VueModel from './VueModel';

const tapTimeout = 1000 * 4;

@Component({})
export default class BpmInput extends VueModel<number> {
	public readonly bpmMin: number = bpmMin;
	public readonly bpmMax: number = bpmMax;
	public bpmValue: number = this.value;
	public taps: Array<number> = [];

	public formatBpm = Formatter.bpm;

	public incBpm(): void {
		if (this.inputValue >= this.bpmMax) {
			return;
		}
		this.inputValue++;
		this.$emit('input', this.inputValue);
	}

	public decBpm(): void {
		if (this.inputValue <= this.bpmMin) {
			return;
		}
		this.inputValue--;
		this.$emit('input', this.inputValue);
	}

	public tapBpm(event: MouseEvent): void {
		const target = event.target as HTMLButtonElement;
		target.blur();

		const now = new Date().getTime();
		if (
			this.taps.length > 0 &&
			now - this.taps[this.taps.length - 1] > tapTimeout
		) {
			this.taps = [];
			this.inputValue = 100;
		}
		this.taps.push(now);
		if (this.taps.length === 1) {
			return;
		}
		const tapsDifference = [];
		for (let index = 1; index < this.taps.length; index++) {
			tapsDifference.push(this.taps[index] - this.taps[index - 1]);
		}
		const avg = tapsDifference.reduce((a, b) => a + b) / tapsDifference.length;
		this.inputValue = Math.round((1000 * 60) / avg);
		this.$emit('input', this.inputValue);
	}
}
</script>

<style scoped lang="less">
</style>
