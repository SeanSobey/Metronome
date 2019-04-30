<template>
	<b-button-group size="lg" class="m-2">
		<b-button variant="primary" v-b-tooltip.hover title="Play">
			<font-awesome-icon icon="play"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Stop">
			<font-awesome-icon icon="stop"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Pause">
			<font-awesome-icon icon="pause"/>
		</b-button>
	</b-button-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class extends Vue {
}
</script>

<style scoped>

</style>
