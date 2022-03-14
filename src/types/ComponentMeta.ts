import { BoxConfig } from '../object/BoxMeta'

export interface PropConfig {
  name: string;
  props?: any;
  type: string;
  disabled?: boolean;
  default?: any;
  label?: string;
  selections?: any;
  path: string;
  row?: number;
  children?: Array<PropConfig>;
  rowLabel?: string;
}
export interface GroupConfig {
  name: string;
  title: string;
  disabled: boolean;
  style: any;
  props: Array<PropConfig>;
}
export interface PropsEditorConfigure {
  groups?: Array<GroupConfig>;
}

export interface ComponentMetaConfig {
  name: string;
  group: string;
  image: string;
  title: string;
  editor: PropsEditorConfigure;
  description: string;
  intrinsic?: boolean;
  style?: any;
  author: string;
  defaultProps: any;
  componentType?: "react" | "vue";
  src: string;
  file: string;
  url?: string;
  yml: string;
  imageUrl: string;
  version: string;
  box?: BoxConfig;
}