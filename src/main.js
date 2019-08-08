import Vue from 'vue';
import Vuetify from 'vuetify';
import Magnet, { vuetify } from '@thrivehive/magnet';
import '@thrivehive/magnet/dist/magnet.css';

import App from './App';
import router from './router';
import store from './store';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import '@/utils/setup';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(Magnet);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App)
}).$mount('#app');
