<template>
	<b-button-group size="lg" class="m-2">
		<b-button variant="primary" v-b-tooltip.hover title="Play" v-on:click="playOnClick">
			<font-awesome-icon icon="play"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Pause" v-on:click="pauseOnClick">
			<font-awesome-icon icon="pause"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Stop" v-on:click="stopOnClick">
			<font-awesome-icon icon="stop"/>
		</b-button>
	</b-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class PlaybackInput extends Vue {
	public playOnClick(): void {
		this.$emit('play');
	}

	public stopOnClick(): void {
		this.$emit('stop');
	}

	public pauseOnClick(): void {
		this.$emit('pause');
	}
}

</script>

<style scoped lang="less">
</style>
