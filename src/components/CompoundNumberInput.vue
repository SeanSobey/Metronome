<template>
	<b-container>
		<b-row>
			<b-col>
				<b-input-group size="sm">
					<b-button variant="primary" slot="prepend" v-on:click="dec()" :disabled="disabled">
						<font-awesome-icon icon="minus"/>
					</b-button>
					<b-form-input type="number" v-model.number="inputValue" :disabled="disabled" :min="min" :max="max"></b-form-input>
					<b-button variant="primary" slot="append" v-on:click="inc()" :disabled="disabled">
						<font-awesome-icon icon="plus"/>
					</b-button>
				</b-input-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-form-input type="range" v-model.number="inputValue" :disabled="disabled" :min="min" :max="max"></b-form-input>
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VueModel from './VueModel';

@Component({})
export default class CompoundNumberInput extends VueModel<number> {
	@Prop({ required: false, default: 0 }) public min!: number;
	@Prop({ required: false, default: 100 }) public max!: number;
	@Prop({ required: false, default: false }) public disabled!: boolean;

	public inc(): void {
		if ((this.inputValue + 10) > this.max) {
			return;
		}
		this.inputValue += 10;
		this.$emit('input', this.inputValue);
	}

	public dec(): void {
		if ((this.inputValue - 10) < this.min) {
			return;
		}
		this.inputValue -= 10;
		this.$emit('input', this.inputValue);
	}
}
</script>

<style scoped lang="less">
</style>
