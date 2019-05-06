<template>
	<div id="Pills">
		<b-badge pill v-for="index in 4" :key="index" :variant="getVariant(index)" class="mx-2 bpm-indicator">{{index}}</b-badge>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({})
export default class BpmIndicator extends Vue {
	@Prop({ required: false, default: 0 }) public currentNote!: number;

	public getVariant(index: number): string {
		if (this.currentNote === index) {
			return 'dark';
		}
		return 'primary';
	}
}
</script>

<style scoped lang="less">
.bpm-indicator {
	transition: 0.25s;
}
</style>
