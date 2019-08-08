import '@/scss/styles.scss';
import Vue from 'vue';
import VeeValidate from 'vee-validate';

// register global components here
const components = [];

Vue.use(VeeValidate);

components.forEach((component) => {
  if (!component.name) {
    console.error('Global components require a name'); // eslint-disable-line
  } else {
    Vue.component(component.name, component);
  }
});
