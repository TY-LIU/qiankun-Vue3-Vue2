export interface AppInfo {
  name: string;
  entry: string;
  container: string;
  activeRule: string;
  props?: {
    [key: string]: any
  };
}
