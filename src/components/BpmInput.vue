<template>
  <b-input-group>
    <b-input-group-prepend>
      <b-input-group-text>
        <font-awesome-icon icon="spinner" class="mr-1"/>BPM
      </b-input-group-text>
    </b-input-group-prepend>
    <b-form-input type="range" :min="bpmMin" :max="bpmMax" v-model="bpm"></b-form-input>
    <b-input-group-append>
      <b-button variant="primary" size="sm" v-on:click="decBpm()">
        <font-awesome-icon icon="minus"/>
      </b-button>
      <b-button variant="primary" size="sm" v-on:click="incBpm()">
        <font-awesome-icon icon="plus"/>
      </b-button>
      <b-button variant="outline-primary" v-on:click="tapBpm($event);">Tap</b-button>
      <b-input-group-text>{{ formatBpm(bpm) }}</b-input-group-text>
    </b-input-group-append>
  </b-input-group>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

interface BpmInputData {
  bpm: number;
  bpmMin: number;
  bpmMax: number;
  taps: Array<number>
}

const tapTimeout = 1000 * 4;

@Component
export default class BpmInput extends Vue {
  @Prop() private readonly msg!: string;

  public data(): BpmInputData {
    return {
      bpm: 100,
      bpmMin: 10,
	  bpmMax: 300,
	  taps: [],
    };
  }

  public formatBpm(): string {
    const data = this.$data as BpmInputData;
    const bpm = data.bpm.toString(10);
    if (bpm.length < 3) {
      return "0" + bpm;
    }
    return bpm;
  }

  public incBpm(): void {
    const data = this.$data as BpmInputData;
    if (data.bpm >= data.bpmMax) {
      return;
    }
    data.bpm++;
  }

  public decBpm(): void {
    const data = this.$data as BpmInputData;
    if (data.bpm <= data.bpmMin) {
      return;
    }
    data.bpm--;
  }

  public tapBpm(event: MouseEvent): void {
    const target = event.target as HTMLButtonElement;
    target.blur();

    const data = this.$data as BpmInputData;
    const now = new Date().getTime();
    if (data.taps.length > 0 && now - data.taps[data.taps.length - 1] > tapTimeout    ) {
      data.taps = [];
      data.bpm = 100;
    }
    data.taps.push(now);
    if (data.taps.length === 1) {
      return;
    }
    const tapsDifference = [];
    for (let index = 1; index < data.taps.length; index++) {
      tapsDifference.push(data.taps[index] - data.taps[index - 1]);
    }
    const avg = tapsDifference.reduce((a, b) => a + b) / tapsDifference.length;
    data.bpm = Math.round((1000 * 60) / avg);
    //Tone.Transport.bpm.value = data.bpm;
  }
}
</script>
