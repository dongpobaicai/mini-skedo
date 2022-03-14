/**
 * 加载组件资源loader
 */
import Emiter from "../object/Emiter";
import { Topics } from "../object/Topics";
import ComponentMeta from "../object/ComponentMeta";

import { ComponentMetaConfig } from "../types/ComponentMeta";

const ymls: { [key: string]: ComponentMetaConfig } = {};
const metas: { [key: string]: ComponentMeta } = {};

//
const ymlModules = import.meta.globEager("./yml/*.js");
for (var key in ymlModules) {
  const [a] = key.replace("./", "").split(".");
  const n = a.split("/").pop();
  if (n && n !== "default") {
    const config: ComponentMetaConfig = ymlModules[key].default;
    ymls[config.group + "." + config.name] = config;
  }
}

export class ComponentsLoader extends Emiter<Topics> {
  // 定义加载对象
  private static inst: ComponentsLoader = new ComponentsLoader();
  state: number = 0;
  list: Array<ComponentMeta> = [];

  static get() {
    // @ts-ignore
    window.componentsLoader = ComponentsLoader.inst;
    return ComponentsLoader.inst;
  }
  // 根据分组和组件名称获取资源
  loadByName(group: string, name: string): ComponentMeta {
    const key = group + "." + name;
    if (!metas[key]) {
      if (!ymls[key]) {
        throw new Error("Type " + key + " not found.");
      }
      const customProps = ymls[key];
      const meta = new ComponentMeta({ ...customProps });
      metas[key] = meta;
    }
    return metas[key];
  }

  // 加载所有组件资源
  load() {
    if (this.state === 1) {
      return;
    }
    for (let key in ymls) {
      const [group, name] = key.split(".");
      this.loadByName(group, name);
    }
    this.state = 1;
    this.list = Object.values(metas).filter((meta) => meta.intrinsic !== true);
  }
}
