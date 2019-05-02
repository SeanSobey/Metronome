<template>
	<b-container>
		<b-row>
			<b-col>
				<b-input-group size="sm">
					<b-button variant="primary" slot="prepend" v-on:click="dec()">
						<font-awesome-icon icon="minus"/>
					</b-button>
					<b-form-input type="number" v-model.number="inputValue" :min="min" :max="max"></b-form-input>
					<b-button variant="primary" slot="append" v-on:click="inc()">
						<font-awesome-icon icon="plus"/>
					</b-button>
				</b-input-group>
			</b-col>
		</b-row>
		<b-row>
			<b-col>
				<b-form-input type="range" v-model.number="inputValue" :min="min" :max="max"></b-form-input>
			</b-col>
		</b-row>
	</b-container>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VueModel from './VueModel';

@Component({})
export default class CompoundNumberInput extends VueModel<number> {
	@Prop() public min!: number;
	@Prop() public max!: number;

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

<style scoped>

</style>
