<template>
	<b-button-group size="lg" class="m-2">
		<b-button variant="primary" v-b-tooltip.hover title="Volume Down" v-on:click="volumeDownOnClick">
			<font-awesome-icon icon="volume-down"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Volume Up" v-on:click="volumeUpOnClick">
			<font-awesome-icon icon="volume-up"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover :title="mute ? 'Volume On' : 'Volume Off'" v-on:click="volumeOffOnClick">
			<font-awesome-icon icon="volume-off"/>&nbsp;{{ volume | volume(mute) }}
		</b-button>
	</b-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

Vue.filter('volume', (value: number, mute: boolean) => {
	if (mute) {
		return '';
	}
	const prefix = value > 0 ? '+' : ''; // No need to account for '-' since number.toString includes a '-'.
	return `${prefix}${value}db`;
});

@Component({})
export default class VolumeInput extends Vue {
	public mute: boolean = false;
	public volume: number = 0;

	public volumeDownOnClick(): void {
		this.mute = false;
		this.volume = Math.round(Math.max(this.volume - 3, -24));
		this.$emit('volume-down', this.volume);
	}

	public volumeUpOnClick(): void {
		this.mute = false;
		this.volume = Math.round(Math.min(this.volume + 3, 24));
		this.$emit('volume-up', this.volume);
	}

	public volumeOffOnClick(): void {
		this.mute = !this.mute;
		if (this.mute) {
			this.$emit('volume-off');
		} else {
			this.$emit('volume-on');
		}
	}
}
</script>

<style scoped>

</style>
