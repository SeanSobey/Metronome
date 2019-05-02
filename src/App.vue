<template>
	<div id="app">
		<div class="container">
			<!-- https://getbootstrap.com/docs/4.0/components/navbar/ -->
			<!-- https://bootstrap-vue.js.org/docs/components/navbar/ -->
			<b-navbar type="dark" variant="primary">
				<b-navbar-brand>
					<img src="./assets/icon.png" width="32" height="32" class="d-inline-block align-top">
					Metronome
				</b-navbar-brand>
				<b-navbar-nav class="ml-auto">
					<b-dropdown-item href="https://github.com/SeanSobey/Metronome">
						<font-awesome-icon :icon="['fab', 'github']" size="lg"/>
					</b-dropdown-item>
				</b-navbar-nav>
			</b-navbar>

			<b-jumbotron text-variant="center" class="my-2">
				<!-- Time -->
				<h2>
					<font-awesome-icon icon="clock" class="mr-3"/>
					<label>0:00:00</label>
				</h2>
				<!-- Playback Controls -->
				<PlaybackInput></PlaybackInput>
				<!-- Volume Controls -->
				<VolumeInput></VolumeInput>
				<hr>
				<!-- BPM -->
				<BpmInput class="my-4"></BpmInput>
				<BpmRampInput class="my-4"></BpmRampInput>
				<br>
			</b-jumbotron>
			<!--
			<img alt="Vue logo" src="./assets/logo.png">
			<HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
			-->
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
// import HelloWorld from "./components/HelloWorld.vue";
import PlaybackInput from './components/PlaybackInput.vue';
import VolumeInput from './components/VolumeInput.vue';
import BpmInput from './components/BpmInput.vue';
import BpmRampInput from './components/BpmRampInput.vue';
import Tone from 'tone';

@Component({
	components: {
		// HelloWorld,
		PlaybackInput,
		VolumeInput,
		BpmInput,
		BpmRampInput,
	},
})
export default class App extends Vue {
	public mounted(): void {
		const synth = new Tone.Synth().toMaster();
		// synth.triggerAttackRelease("C4", "8n");
	}
}
</script>

<style lang="less">
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
