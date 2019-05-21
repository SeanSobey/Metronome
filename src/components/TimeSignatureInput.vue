<template>
	<b-input-group size="lg">
		<b-input-group-prepend>
			<b-input-group-text>
				<font-awesome-icon :icon="['fab', 'itunes-note']" class="mr-1"/>Time Signature
			</b-input-group-text>
		</b-input-group-prepend>
		<b-form-input
			type="number"
			v-model.number="inputValue"
			:disabled="disabled"
			:min="beatsPerBarMin"
			:max="beatsPerBarMax"
		></b-form-input>
		<b-input-group-append>
			<b-input-group-text>
				{{ inputValue | timeSignature() }} / 4
			</b-input-group-text>
		</b-input-group-append>
	</b-input-group>
</template>

<script lang="ts">
import { Watch, Component, Prop, Vue } from 'vue-property-decorator';
import VueModel from './VueModel';

Vue.filter('timeSignature', (value: number) => value > 9 ? value.toString() : ' ' + value.toString()); // TODO: not seem to work

@Component({})
export default class TimeSignatureInput extends VueModel<number> {
	@Prop({ required: false, default: false }) public disabled!: boolean;
	public beatsPerBarMin: number = 1;
	public beatsPerBarMax: number = 16;

	@Watch('inputValue')
	public inputValueWatcher(inputValue: number): void {
		this.$emit('input', this.inputValue);
	}
}
</script>

<style scoped lang="less">
</style>
