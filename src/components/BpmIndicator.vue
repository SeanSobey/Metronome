<template>
	<div class="h4 border border-secondary rounded d-inline-flex m-0 p-2">
		<b-badge pill
			v-for="beatIndex in beatsPerBar"
			:key="beatIndex"
			:variant="getPillVariant(beatIndex)"
			class="mx-2 bpm-indicator">{{ beatIndex }}
		</b-badge>
	</div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';

@Component({})
export default class BpmIndicator extends Vue {
	@Prop({ required: true }) public beatsPerBar!: number;
	@Prop({ required: true }) public currentBeat!: number;

	public getPillVariant(beatIndex: number): string {
		if (beatIndex === this.currentBeat) {
			return 'dark';
		}
		if (beatIndex === 1) {
			return 'light';
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
