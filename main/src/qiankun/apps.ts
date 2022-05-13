import { AppInfo } from '../../types/base';
import { RegistrableApp } from 'qiankun/es/interfaces';

const apps: RegistrableApp<AppInfo>[] = [
  {
    name: 'doc',
    entry: `${process.env.VUE_APP_API_HOST}:6800/`,
    container: '#appContainer',
    activeRule: '/doc'
  }
];

export default apps;
