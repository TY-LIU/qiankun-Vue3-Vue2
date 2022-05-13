import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './router';

Vue.config.productionTip = false;

const APP_NAME = require('../package.json').name;
let router;
let instance;

function render ({ container } = {}) {
  router = new VueRouter({
    base: window.__POWERED_BY_QIANKUN__ ? `/${APP_NAME}` : '/',
    mode: 'history',
    routes
  });

  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#appDoc') : '#appDoc');
}

if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap () {
  console.log('vue app bootstrap');
}

export async function mount (props) {
  console.log('props from main framework', props);
  render(props);
}

export async function unmount () {
  instance.$destroy();
  instance.$el.innerHTML = null;
  instance = null;
  router = null;
}
