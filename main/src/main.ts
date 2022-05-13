import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { registerMicroApps, start } from 'qiankun';

createApp(App).use(store).use(router).mount('#app');

registerMicroApps([
  {
    name: 'doc',
    entry: `${process.env.VUE_APP_API_HOST}:6800/`,
    container: '#appContainer',
    activeRule: '/doc',
    props: { data: { store, router } }
  }
], {
  beforeLoad: (app) => {
    // 加载微应用前，加载进度条
    console.log('before load', app);
    console.log('before load', app.name);
    return Promise.resolve();
  },
  afterMount: (app) => {
    // 加载微应用前，进度条加载完成
    console.log('after mount', app.name);
    return Promise.resolve();
  }
});

// 启动 qiankun
const excludeAsserts: string[] = ['gm-itrade'];

function insertEle(url: string) {
  const head = document.getElementsByTagName('head')[0];
  let el: HTMLLinkElement | HTMLScriptElement;
  if (url.includes('css')) {
    el = document.createElement('link');
    el.rel = 'stylesheet';
    el.href = url;
  } else {
    el = document.createElement('script');
    el.src = url;
  }

  head.append(el);
  el.onload = () => {
    console.log('load:', url);
  };
}

start({
  // 如果是动态添加js
  excludeAssetFilter: url => url.indexOf('gm-itrade') !== -1,
  // 如果是静态添加的
  async fetch(url: Request | string, ...args: any[]): Promise<Response> {
    if (excludeAsserts.some(item => (url as string).includes(item))) {
      insertEle(url as string);
      // do something
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // return Promise.resolve()
      return {
        async text() {
          return '';
        }
      };
    }
    return window.fetch(url, ...args);
  }
});
