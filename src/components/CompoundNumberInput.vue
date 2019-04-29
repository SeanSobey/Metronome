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

interface Data {
	inputValue: number;
}

@Component({})
export default class extends Vue {
	@Prop() public value!: number;
	@Prop() public min!: number;
	@Prop() public max!: number;

	public data(): Data {
		return {
			inputValue: this.value,
		};
	}

	@Watch('inputValue')
	public inputValueWatcher(value: number): void {
		this.$emit('input', value);
	}

	public inc(): void {
		const data = this.$data as Data;
		if ((data.inputValue + 10) > this.max) {
			return;
		}
		data.inputValue += 10;
		this.$emit('input', data.inputValue);
	}

	public dec(): void {
		const data = this.$data as Data;
		if ((data.inputValue - 10) < this.min) {
			return;
		}
		data.inputValue -= 10;
		this.$emit('input', data.inputValue);
	}
}
</script>

<style scoped>

</style>
