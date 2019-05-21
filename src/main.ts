import Vue from 'vue';
import App from './App.vue';
import BootstrapVue from 'bootstrap-vue';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
	faClock, faPlay, faStop, faPause, faVolumeOff, faVolumeDown, faVolumeUp, faSpinner, faPlus, faMinus, faSignal, faArrowUp, faArrowDown
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faItunesNote } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon, FontAwesomeLayers, FontAwesomeLayersText } from '@fortawesome/vue-fontawesome';

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

// https://github.com/FortAwesome/vue-fontawesome
// https://fontawesome.com/icons?d=gallery
library.add(faClock, faPlay, faStop, faPause, faVolumeOff, faVolumeDown, faVolumeUp, faSpinner, faPlus, faMinus, faSignal, faArrowUp, faArrowDown);
library.add(faGithub, faItunesNote);
Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('font-awesome-layers', FontAwesomeLayers);
Vue.component('font-awesome-layers-text', FontAwesomeLayersText);

new Vue({
	render: (createElement) => createElement(App)
}).$mount('#app');
