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
        <b-button-group size="lg" class="mx-3">
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
        <!-- Volume Controls -->
        <b-button-group size="lg" class="mx-3">
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
        <hr>
        <!-- BPM -->
        <BpmInput msg="Welcome to Your Vue.js + TypeScript App"></BpmInput>
		<br/>
      </b-jumbotron>

      <!--
	  <img alt="Vue logo" src="./assets/logo.png">
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
	  -->
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
//import HelloWorld from "./components/HelloWorld.vue";
import BpmInput from "./components/BpmInput.vue";
import Tone from "tone";
import { foo } from "./test";

@Component({
  components: {
    //HelloWorld,
    BpmInput,
  }
})
export default class App extends Vue {
  public mounted(): void {
    const synth = new Tone.Synth().toMaster();
    //synth.triggerAttackRelease("C4", "8n");
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
