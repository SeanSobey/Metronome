<template>
	<b-button-group size="lg" class="m-2">
		<b-button variant="primary" v-b-tooltip.hover title="Volume Down">
			<font-awesome-icon icon="volume-down"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Volume Up">
			<font-awesome-icon icon="volume-up"/>
		</b-button>
		<b-button variant="primary" v-b-tooltip.hover title="Volume Off">
			<font-awesome-icon icon="volume-off"/>
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
