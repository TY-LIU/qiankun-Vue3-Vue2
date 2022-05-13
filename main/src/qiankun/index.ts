import { registerMicroApps, addGlobalUncaughtErrorHandler, start } from 'qiankun';
import apps from '@/qiankun/apps';
import { AppInfo } from '../../types/base';
import { LoadableApp } from 'qiankun/es/interfaces';

/**
 * 注册微应用
 * 第一个参数 - 微应用的注册信息
 * 第二个参数 - 全局生命周期钩子
 */
registerMicroApps(apps, {
  beforeLoad: (app: LoadableApp<AppInfo>) => {
    // 加载微应用前，加载进度条
    console.log('before load', app);
    console.log('before load', app.name);
    return Promise.resolve();
  },
  afterMount: (app: LoadableApp<AppInfo>) => {
    // 加载微应用前，进度条加载完成
    console.log('after mount', app.name);
    return Promise.resolve();
  }
});

addGlobalUncaughtErrorHandler((event: Event | string) => {
  console.error(event);
});

export default start;
